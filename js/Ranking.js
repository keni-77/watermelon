
/**
 * Ranking.js
 * 世界同期デイリーランキング（Supabase版）の管理クラス
 */
class Ranking {
    static URL = 'https://kwmkewqcwobazrvlwupm.supabase.co';
    static KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt3bWtld3Fjd29iYXpydmx3dXBtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM5NzE1MDksImV4cCI6MjA4OTU0NzUwOX0.DbJfQQCuE1pLK2bQ06q8seeTxU2NHIn4iiWHrUP-xsY';
    static supabase = null;
    static scores = []; // メモリ上に保持するランキングデータ

    /**
     * Supabaseクライアントの初期化
     */
    static init() {
        if (!this.supabase && window.supabase) {
            this.supabase = window.supabase.createClient(this.URL, this.KEY);
        }
        return this.supabase;
    }

    /**
     * 今日の開始日時（ISO 8601）をUTCで取得
     */
    static getTodayStartISO() {
        const now = new Date();
        now.setHours(0, 0, 0, 0); // ローカル時間の00:00:00
        return now.toISOString(); // UTCに変換した文字列
    }

    /**
     * ランキングデータをクラウドから読み込む
     */
    static async load() {
        this.init();
        if (!this.supabase) return [];

        try {
            const todayStart = this.getTodayStartISO();
            const { data, error } = await this.supabase
                .from('daily_scores')
                .select('score')
                .gte('created_at', todayStart)
                .order('score', { ascending: false })
                .limit(5);

            if (error) throw error;
            
            this.scores = data.map(d => d.score);
            return this.scores;
        } catch (e) {
            console.error('Ranking Load Error:', e);
            return this.scores; // エラー時は現状維持
        }
    }

    /**
     * 新しいスコアを保存する
     */
    static async saveScore(score) {
        if (score <= 0) return;
        this.init();
        if (!this.supabase) return;

        try {
            const { error } = await this.supabase
                .from('daily_scores')
                .insert([{ score: score }]);

            if (error) throw error;
            
            // 保存後に最新をリロード
            await this.load();
        } catch (e) {
            console.error('Ranking Save Error:', e);
        }
    }

    /**
     * ランキング表示用のHTMLを生成する
     */
    static getDisplayHTML(title = "本日の世界ランキング") {
        let html = `
            <div style="margin-top: 20px; text-align: center; background: rgba(0, 0, 0, 0.4); padding: 20px 40px; border-radius: 20px; border: 3px solid rgba(255, 145, 0, 0.5); min-width: 320px; backdrop-filter: blur(5px);">
                <div style="font-size: 30px; color: #ff9100; font-weight: bold; margin-bottom: 15px; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);">${title}</div>
        `;

        if (this.scores.length === 0) {
            html += `<div style="font-size: 24px; color: rgba(255, 255, 255, 0.6); animation: pulse 1.5s infinite;">データ読み込み中...</div>`;
        } else {
            html += `<div style="display: flex; flex-direction: column; gap: 8px;">`;
            this.scores.forEach((s, i) => {
                const color = i === 0 ? "#ffd700" : (i === 1 ? "#c0c0c0" : (i === 2 ? "#cd7f32" : "white"));
                const crown = i === 0 ? "👑 " : "";
                html += `
                    <div style="font-size: 28px; color: ${color}; font-weight: bold; display: flex; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 4px;">
                        <span>${crown}${i + 1}位</span>
                        <span>${s.toLocaleString()}点</span>
                    </div>
                `;
            });
            html += `</div>`;
        }

        html += `</div>
        <style>
            @keyframes pulse {
                0% { opacity: 0.4; }
                50% { opacity: 1; }
                100% { opacity: 0.4; }
            }
        </style>`;
        return html;
    }
}
