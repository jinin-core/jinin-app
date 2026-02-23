"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { toJpeg } from "html-to-image";
import { NeonButton } from "@/components/NeonButton";
import { ProgressBar } from "@/components/ProgressBar";
import { SwipeCard } from "@/components/SwipeCard";
import { Share2, Link as LinkIcon, AlertTriangle, X, Download, Twitter, ArrowLeft } from "lucide-react";

// Questions List
const QUESTIONS = [
    "Instagramの「親しい友達」限定ストーリーで、月1回以上は病み投稿をする。",
    "誰にも教えていないSNSの「裏垢」を3つ以上持っている。",
    "LINEのBGMやステータスメッセージを「匂わせソング」に変えることがある。",
    "位置情報アプリで、相手が今どこにいるか、電池残量が何％かを1日に何度もチェックする。",
    "相手のSNSの「フォロワー一覧」が一人増えただけで特定しようとしたことがある。",
    "返信が遅い時、わざと自分も同じ時間だけ放置して「駆け引き」をしてしまう。",
    "喧嘩をした際、相手をブロックしたり、全ての投稿を消して「消滅」したくなる。",
    "「私なんていなくなった方がいいんでしょ」と自分を卑下して気を引こうとする。",
    "相手が自分以外の異性と楽しそうにしているのを見ると、復讐に近い感情を抱く。",
    "特に用がなくても24時間「寝落ち通話」をつなぎっぱなしにしたい。",
    "相手のちょっとした言動で「もう一生信じられない」と一瞬で愛情が冷める（蛙化）ことがある。",
    "「私のどこが好き？」と聞き、納得のいく答えが返ってくるまで何度も確認してしまう。",
];

// Result Types (16 MBTI-style combinations)
// Result Types (16 MBTI-style combinations)
const RESULTS = [
    { code: "LTCS", title: "完全無欠のサイボーグ", subtitle: "LTCS", catchphrase: "え、なんで怒ってるの？恋愛のバグに気づかない超ドライ人間。", image: "/jirai/ltcs.png", description: "相手のSNSや位置情報に全く興味がなく、自分の時間は自分のものというスタンス。束縛を嫌い、サバサバしていますが、感情の起伏が少なすぎて相手からは「本当に私のこと好きなの？」と不安がられることもしばしば。地雷度は限りなくゼロに近いレアキャラです。", color: "cyan", bestMatch: "HSMB", worstMatch: "HTCS" },
    { code: "LTCB", title: "絶対零度のスナイパー", subtitle: "LTCB", catchphrase: "熱しやすく冷めやすい。一瞬の萎えで全てをシャットダウン。", image: "/jirai/ltcb.png", description: "相手のちょっとした言動やダサい部分を見た瞬間、一瞬で「蛙化現象」を起こして愛情がマイナスに振り切れます。昨日まであんなに好きだったのに、翌日には「無理、触らないで」と冷酷に切り捨てる、ある意味で一番恐ろしいタイプです。", color: "cyan", bestMatch: "HSCS", worstMatch: "HTMB" },
    { code: "LTMS", title: "匂わせの錬金術師", subtitle: "LTMS", catchphrase: "直接は言わない。LINEのBGMとストーリーで全てを察してほしい。", image: "/jirai/ltms.png", description: "不満や病み感情を直接言葉で伝えるのは「負け」だと思っています。その代わり、意味深なポエムや曲の歌詞、アイコンの変更などを駆使して間接的なアピールを行い、相手の罪悪感をじわじわと煽る天才です。", color: "pink", bestMatch: "LSCS", worstMatch: "HTMS" },
    { code: "LTMB", title: "既読無視の策士", subtitle: "LTMB", catchphrase: "返信速度は計算済み。恋の主導権を絶対に渡さない頭脳派。", image: "/jirai/ltmb.png", description: "相手からの返信が遅れれば、わざと自分も同じ時間だけ放置して「駆け引き」を仕掛けます。常に自分が優位に立っていないと気が済まず、LINEの文面やスタンプのタイミングまで全て計算し尽くしているデジタル恋愛の策士です。", color: "pink", bestMatch: "LSMB", worstMatch: "HTCB" },
    { code: "LSCS", title: "デジタル凄腕探偵", subtitle: "LSCS", catchphrase: "フォロワーの増減は逃さない。息をするように特定作業を行うプロ。", image: "/jirai/lscs.png", description: "相手の「いいね」欄や新しいフォロワーを日常的にパトロールしています。見知らぬ異性のアカウントが増えれば、投稿内容やリプライから瞬時に繋がりを特定。浮気の芽はデータと執念で完全に摘み取ります。", color: "cyan", bestMatch: "LTMS", worstMatch: "HSCB" },
    { code: "LSCB", title: "裏垢の千手観音", subtitle: "LSCB", catchphrase: "表の顔は優等生。鍵垢で毒を吐きまくるデジタル・ジキルとハイド。", image: "/jirai/lscb.png", description: "本垢では絶対に病み投稿をしませんが、誰にも教えていない裏垢を複数持ち、そこでドロドロの感情を爆発させます。愚痴用、監視用、情報収集用などアカウントを完璧に使い分け、表と裏の顔のギャップが最も激しいタイプです。", color: "pink", bestMatch: "HTCS", worstMatch: "HSCS" },
    { code: "LSMS", title: "親友ストーリーのポエム職人", subtitle: "LSMS", catchphrase: "緑のリングはSOSのサイン。選ばれし者だけに病みを公開。", image: "/jirai/lsms.png", description: "本当に仲の良い限られた友人（またはターゲットの相手本人）にだけ、Instagramの「親しい友達」機能を使って黒背景の極小文字でSOSを出します。誰かが心配してDMをくれるのを、じっとスマホを握りしめて待っています。", color: "pink", bestMatch: "HSMS", worstMatch: "LTCB" },
    { code: "LSMB", title: "擬態型カメレオン", subtitle: "LSMB", catchphrase: "普段はサバサバ系。しかし深夜になると突然情緒が崩壊する隠れ地雷。", image: "/jirai/lsmb.png", description: "明るい時間帯や人前では地雷感を一切出しませんが、夜中の一人きりの時間や、アルコールが入った瞬間にリミッターが外れます。翌朝になって、自分が送った重い長文LINEを見て死にたくなる自己嫌悪のプロです。", color: "pink", bestMatch: "LTMB", worstMatch: "HTCB" },
    { code: "HTCS", title: "悲劇のヒロイン症候群", subtitle: "HTCS", catchphrase: "「どうせ私なんて…」が口癖。同同情と愛を同時に求める構ってちゃん。", image: "/jirai/htcs.png", description: "あえて自分を卑下したり、「いなくなった方がいいよね」と極端なことを言うことで、相手からの「そんなことないよ、一番好きだよ」という言葉を引き出そうとします。愛情を試すような行動が多く、少しめんどくさくて愛おしいタイプです。", color: "pink", bestMatch: "LSCB", worstMatch: "LTCS" },
    { code: "HTCB", title: "全消しのデストロイヤー", subtitle: "HTCB", catchphrase: "怒りの沸点に達すると、ブロック＆履歴全削除で突如「消滅」する。", image: "/jirai/htcb.png", description: "喧嘩をすると、話し合って解決する前にLINEもSNSも全てブロックし、自分の存在ごと跡形もなく消し去ろうとします。しかし、実は相手が焦って他の手段で追いかけてきてくれるのを、心のどこかで強く期待している節があります。", color: "pink", bestMatch: "HSMB", worstMatch: "LTMB" },
    { code: "HTMS", title: "寝落ち通話の亡霊", subtitle: "HTMS", catchphrase: "繋がっていないと息ができない。24時間オンラインを求める寂しがり屋。", image: "/jirai/htms.png", description: "一人の時間が極端に苦手で、特に用がなくてもずっと通話を繋ぎっぱなしにしたいタイプ。少しでも連絡が途絶えたり、先に寝落ちされたりすると「私のこと嫌いになった？」と被害妄想が爆発してしまいます。", color: "pink", bestMatch: "LTMS", worstMatch: "LSMS" },
    { code: "HTMB", title: "愛のパスワードチェッカー", subtitle: "HTMB", catchphrase: "納得いくまで無限ループ。常に証明を求める愛情確認のプロ。", image: "/jirai/htmb.png", description: "愛されている自信が常に枯渇しており、言葉での確認を異常なほど求めます。「優しいところ」などと適当に返されると即座に不機嫌になり、具体的で完璧な回答が出るまで絶対に相手を逃がしません。", color: "pink", bestMatch: "HSCB", worstMatch: "LTCB" },
    { code: "HSCS", title: "位置情報依存のレーダー", subtitle: "HSCS", catchphrase: "相手の現在地とバッテリー残量が私の精神安定剤。", image: "/jirai/hscs.png", description: "位置情報共有アプリがないと不安で死にそうになります。「なんで家にいるのに充電減ってるの？」「この移動速度は車？」と、画面の向こう側の相手の行動を24時間監視し、脳内で常に推理が止まりません。", color: "pink", bestMatch: "LTCB", worstMatch: "LSCB" },
    { code: "HSCB", title: "愛憎の狂戦士", subtitle: "HSCB", catchphrase: "愛と憎しみは紙一重。他の異性と話しただけで脳内で復讐の炎が燃える。", image: "/jirai/cyber_general.png", description: "独占欲が異常に高く、相手が自分以外と楽しそうにしているのを見るだけで殺意に近い感情が湧きます。相手の裏切り（と自分が判定した行動）には、徹底的に追い詰めて100倍返しをしないと気が済まない過激派です。", color: "pink", bestMatch: "HTMB", worstMatch: "LSCS" },
    { code: "HSMS", title: "過保護なAIバグ", subtitle: "HSMS", catchphrase: "尽くしすぎて自爆する。相手のすべてを管理しないと気が済まない。", image: "/jirai/hidden_menhera.png", description: "相手のスケジュールから交友関係、着る服まで全てを把握し「私がいないとダメ」な状態を作り上げます。しかし、自分の献身に対する見返りが少しでも足りないと、突如システムエラーを起こして激ギレします。", color: "pink", bestMatch: "LSMS", worstMatch: "HTCS" },
    { code: "HSMB", title: "電脳世界の地雷将軍", subtitle: "HSMB", catchphrase: "監視、束縛、病み、全てを網羅した完全武装のラスボス。", image: "/jirai/cyber_general.png", description: "12の質問全てに当てはまる勢いの、圧倒的ポテンシャルを秘めた逸材。SNSを駆使した恐るべき情報収集能力と、逃げ場をなくすほどの重い愛情を兼ね備えています。一度愛した相手は絶対に逃がさない、JININが誇る最強の地雷です。", color: "pink", bestMatch: "LTCS", worstMatch: "HTCB" }
];

type AppState = "START" | "DIAGNOSIS" | "ATTRIBUTES" | "RESULT";

export default function JiraiDiagnosisPage() {
    const [appState, setAppState] = useState<AppState>("START");
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState<boolean[]>([]);
    const [matchModal, setMatchModal] = useState<"best" | "worst" | null>(null);
    const [gender, setGender] = useState<string | null>(null);
    const [birthYear, setBirthYear] = useState<string>("");
    const [birthMonth, setBirthMonth] = useState<string>("");
    const [birthDay, setBirthDay] = useState<string>("");
    const [mbti, setMbti] = useState<string>("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [base64Avatar, setBase64Avatar] = useState<string>("");
    const [base64Logo, setBase64Logo] = useState<string>("");

    useEffect(() => {
        // Enforce an aggressive top-scroll alignment to combat Safari's scroll retention on React re-renders.
        // Bypassing `requestAnimationFrame` and smooth-scroll options `behavior: instant` which silently fails on some WebViews.
        const resetScroll = () => {
            window.scrollTo(0, 0);
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
        };

        // Fire immediately upon React state resolution
        resetScroll();

        // Fire staggered fallbacks to catch lagging layout repaints (images loading, flex recalculations, toolbar shifts)
        const t1 = setTimeout(resetScroll, 10);
        const t2 = setTimeout(resetScroll, 50);
        const t3 = setTimeout(resetScroll, 100);

        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
        };
    }, [appState]);

    const handleStart = () => {
        setAppState("DIAGNOSIS");
    };

    const calculateResultCode = () => {
        // AXIS A (Q8: idx 7, Q10: idx 9, Q12: idx 11)
        const aCount = (answers[7] ? 1 : 0) + (answers[9] ? 1 : 0) + (answers[11] ? 1 : 0);
        const axisA = aCount >= 2 ? "H" : "L";

        // AXIS B (Q2: idx 1, Q4: idx 3, Q5: idx 4)
        const bCount = (answers[1] ? 1 : 0) + (answers[3] ? 1 : 0) + (answers[4] ? 1 : 0);
        const axisB = bCount >= 2 ? "S" : "T";

        // AXIS C (Q1: idx 0, Q3: idx 2, Q6: idx 5)
        const cCount = (answers[0] ? 1 : 0) + (answers[2] ? 1 : 0) + (answers[5] ? 1 : 0);
        const axisC = cCount >= 2 ? "M" : "C";

        // AXIS D (Q7: idx 6, Q9: idx 8, Q11: idx 10)
        const dCount = (answers[6] ? 1 : 0) + (answers[8] ? 1 : 0) + (answers[10] ? 1 : 0);
        const axisD = dCount >= 2 ? "B" : "S";

        return `${axisA}${axisB}${axisC}${axisD}`;
    };

    const handleSwipe = (isYes: boolean) => {
        setAnswers((prev) => {
            const newAnswers = [...prev];
            newAnswers[currentIndex] = isYes;
            return newAnswers;
        });

        if (currentIndex < QUESTIONS.length - 1) {
            setCurrentIndex((prev) => prev + 1);
        } else {
            setTimeout(() => setAppState("ATTRIBUTES"), 500); // Wait for last animation then go to attribute form
        }
    };

    const getResult = () => {
        const code = calculateResultCode();
        return RESULTS.find((r) => r.code === code) || RESULTS[0];
    };

    useEffect(() => {
        if (appState === "RESULT") {
            const result = getResult();

            // Prefetch Avatar
            fetch(result.image)
                .then(res => res.blob())
                .then(blob => {
                    const reader = new FileReader();
                    reader.onloadend = () => setBase64Avatar(reader.result as string);
                    reader.readAsDataURL(blob);
                })
                .catch(err => console.error("Avatar fetch error:", err));

            // Prefetch Top Logo
            fetch("/jinin_logo.png")
                .then(res => res.blob())
                .then(blob => {
                    const reader = new FileReader();
                    reader.onloadend = () => setBase64Logo(reader.result as string);
                    reader.readAsDataURL(blob);
                })
                .catch(err => console.error("Logo fetch error:", err));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [appState]);

    const submitToSpreadsheet = () => {
        if (!gender || gender === "答えない") {
            // "答えない" is a valid submission, so we allow it but enforce they clicked something if it's strictly buttons. 
            // Our gender buttons include "答えない", so it just needs to be non-null.
            if (!gender) {
                alert("性別を選択してください。（答えない、も選択可能です）");
                return;
            }
        }

        if (!birthYear || !birthMonth || !birthDay) {
            alert("生年月日をすべて選択してください。");
            return;
        }

        if (!mbti) {
            alert("MBTIを選択してください。（わからない場合は「わからない」を選択可能です）");
            return;
        }

        const result = getResult();
        const now = new Date();

        // Format YYYY/MM/DD
        const yyyy = now.getFullYear();
        const mm = String(now.getMonth() + 1).padStart(2, '0');
        const dd = String(now.getDate()).padStart(2, '0');
        const diagnosisDate = `${yyyy}/${mm}/${dd}`;

        // Format HH:mm:ss
        const hh = String(now.getHours()).padStart(2, '0');
        const min = String(now.getMinutes()).padStart(2, '0');
        const ss = String(now.getSeconds()).padStart(2, '0');
        const diagnosisTime = `${hh}:${min}:${ss}`;

        const formattedBirthMonth = birthMonth.padStart(2, '0');
        const formattedBirthDay = birthDay.padStart(2, '0');

        const payload = {
            sheetName: "隠れ地雷度診断",
            data: {
                diagnosisDate: diagnosisDate,
                diagnosisTime: diagnosisTime,
                birthDate: `${birthYear}/${formattedBirthMonth}/${formattedBirthDay}`,
                gender: gender,
                q1: !!answers[0],
                q2: !!answers[1],
                q3: !!answers[2],
                q4: !!answers[3],
                q5: !!answers[4],
                q6: !!answers[5],
                q7: !!answers[6],
                q8: !!answers[7],
                q9: !!answers[8],
                q10: !!answers[9],
                q11: !!answers[10],
                q12: !!answers[11],
                resultType: result.title,
                mbti: mbti || "未回答"
            }
        };

        const webhookUrl = process.env.NEXT_PUBLIC_GAS_WEBAPP_URL;

        if (webhookUrl) {
            // Background async fetch with fire-and-forget try-catch
            (async () => {
                try {
                    await fetch(webhookUrl, {
                        method: "POST",
                        headers: {
                            "Content-Type": "text/plain;charset=utf-8", // GAS typically requires text/plain to avoid CORS preflight, or proper CORS setup on the Apps Script side
                        },
                        body: JSON.stringify(payload)
                    });
                    console.log("データ送信リクエスト完了");
                } catch (e) {
                    // Fail silently so user experience is not disrupted
                    console.error("データバックグラウンド送信エラー:", e);
                }
            })();
        } else {
            console.warn("Webhook URL (NEXT_PUBLIC_GAS_WEBAPP_URL) is not set. Payload:", payload);
        }

        // Instantly transition user to result screen regardless of fetch status
        setAppState("RESULT");
    };

    const copyUrl = async () => {
        try {
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText("https://jinin.example.com/jirai");
                alert("URLをコピーしました！");
            } else {
                alert("URL: https://jinin.example.com/jirai\n（お使いの環境では自動コピーが制限されているため、手動でコピーしてください）");
            }
        } catch (err) {
            alert("URLのコピーに失敗しました。");
        }
    };

    const handleGenericShare = async (platform: string) => {
        const result = getResult();
        const shareText = `私の隠れ地雷タイプは【${result.title}】でした！\n「${result.catchphrase}」\n\n診断はこちらから👇\nhttps://jinin.example.com/jirai\n#JININ #${platform}`;

        try {
            if (navigator.clipboard) {
                await navigator.clipboard.writeText(shareText);
                alert(`結果テキストとURLをコピーしました！\nご自身の ${platform} アプリを開いてペーストしてシェアしてください📸✨`);
            } else {
                alert(`URL: https://jinin.example.com/jirai\n（お使いの環境では自動コピーが制限されています。手動でコピーして ${platform} へシェアしてください）`);
            }
        } catch (err) {
            alert("テキストのコピーに失敗しました。");
        }
    };

    const shareToTwitter = () => {
        const result = getResult();
        const yesPercentage = Math.round((answers.filter(a => a).length / QUESTIONS.length) * 100);
        const text = `私の隠れ地雷度は${yesPercentage}%、タイプは【${result.title}】でした！\n\n私も知らない私をJININ👉 https://jinin.example.com/jirai\n#JININ #隠れ地雷度診断`;
        const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
        window.open(url, "_blank");
    };

    const downloadImage = async () => {
        const element = document.getElementById("share-card");
        if (!element) return;

        try {
            setIsGenerating(true);

            // WebKit Safari Hack: Force a throwaway render pass. 
            // iOS Safari lazily decodes image assets inside the cloned DOM of html-to-image 
            // and drops them on the first pass to save memory.
            try {
                await Promise.race([
                    toJpeg(element, { width: 10, height: 10, quality: 0.1 }),
                    new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 500))
                ]);
            } catch (e) { /* ignore */ }

            const dataUrl = await toJpeg(element, {
                quality: 0.85,
                pixelRatio: 1, // Crucial for iOS Safari memory limits. Do not use 2.
                backgroundColor: "#050505",
                style: {
                    transform: "scale(1)",
                    transformOrigin: "top left"
                }
            });

            const link = document.createElement("a");
            link.href = dataUrl;
            const result = getResult();
            link.download = `jinin_${result.code}.png`;
            link.click();
        } catch (err) {
            console.error("画像生成エラー:", err);
            alert("画像の保存に失敗しました。");
        } finally {
            setIsGenerating(false);
        }
    };

    if (appState === "START") {
        return (
            <div className="flex-grow flex flex-col items-center justify-center w-full p-6 relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neon-cyan to-neon-pink"></div>

                {/* Return Link */}
                <div className="absolute top-6 left-6 z-20">
                    <Link href="/" className="flex items-center text-xs text-gray-400 hover:text-white transition-colors group">
                        <ArrowLeft size={16} className="mr-1 group-hover:-translate-x-1 transition-transform" />
                        トップへ戻る
                    </Link>
                </div>
                <AlertTriangle size={48} className="text-neon-pink mb-6 animate-pulse drop-shadow-[0_0_10px_#FF00FF]" />
                <h1 className="text-4xl md:text-5xl font-black mb-4 text-center text-glow-pink text-white animate-glitch line-clamp-2">
                    隠れ地雷度診断
                </h1>
                <p className="text-gray-400 text-center mb-12 max-w-xs text-sm">
                    あなたの心の奥底に潜む「メンヘラ・地雷」要素を、直感的なスワイプで暴き出します。
                </p>
                <NeonButton color="pink" onClick={handleStart} className="w-full max-w-xs">
                    診断を始める
                </NeonButton>
            </div>
        );
    }

    if (appState === "DIAGNOSIS") {
        // We render the cards in reverse order so the current one is on top
        return (
            <div className="flex-grow flex flex-col w-full px-4 py-2 relative overflow-hidden">
                <div className="mt-6 mb-2">
                    <ProgressBar current={currentIndex + 1} total={QUESTIONS.length} />
                </div>

                <div className="relative flex-grow w-full max-w-md mx-auto flex items-center justify-center">
                    {QUESTIONS.map((question, index) => {
                        // Only render current and next couple of cards for performance
                        if (index < currentIndex || index > currentIndex + 2) return null;

                        return (
                            <div key={index} className="absolute inset-0 flex items-center justify-center w-full h-full" style={{ zIndex: 100 - index }}>
                                <SwipeCard
                                    question={question}
                                    onSwipeRight={() => handleSwipe(true)}
                                    onSwipeLeft={() => handleSwipe(false)}
                                />
                            </div>
                        );
                    })}
                </div>

                <div className="text-center text-[10px] text-gray-500 font-mono tracking-wider mt-auto pb-2">
                    SYSTEM: ANALYZING BEHAVIOR PATTERNS...
                </div>
            </div>
        );
    }

    if (appState === "ATTRIBUTES") {
        return (
            <div className="flex-grow flex flex-col items-center justify-start w-full p-6 pt-12 relative bg-[#050505] overflow-y-auto">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neon-cyan to-neon-pink"></div>

                <div className="w-full max-w-sm mb-6 text-center animate-pulse">
                    <p className="font-mono text-neon-cyan text-xs tracking-widest mb-1">ANALYZING...</p>
                    <h2 className="text-lg font-bold text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
                        傾向分析のために教えてください
                    </h2>
                </div>

                <div className="w-full max-w-md space-y-6 flex flex-col justify-start">
                    {/* Gender Selection */}
                    <div className="bg-black border border-gray-800 rounded-2xl p-5 shadow-lg relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gray-800 to-gray-600 opacity-50"></div>
                        <h3 className="text-sm font-bold text-gray-300 mb-3 flex items-center">
                            <span className="text-neon-pink mr-2">▶</span> 性別
                        </h3>
                        <div className="grid grid-cols-3 gap-2">
                            {["女性", "男性", "答えない"].map((g) => (
                                <button
                                    key={g}
                                    onClick={() => setGender(g)}
                                    className={`py-3 rounded-lg text-xs font-bold transition-all ${gender === g
                                        ? "bg-neon-pink/20 border-2 border-neon-pink text-white box-glow-pink"
                                        : "bg-[#111] border border-gray-700 text-gray-400 hover:border-gray-500"
                                        }`}
                                >
                                    {g}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Age Selection */}
                    <div className="bg-black border border-gray-800 rounded-2xl p-5 shadow-lg relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gray-800 to-gray-600 opacity-50"></div>
                        <h3 className="text-sm font-bold text-gray-300 mb-3 flex items-center">
                            <span className="text-neon-cyan mr-2">▶</span> 生年月日
                        </h3>
                        <div className="flex space-x-2">
                            <div className="relative w-full">
                                <select
                                    value={birthYear}
                                    onChange={(e) => setBirthYear(e.target.value)}
                                    className={`w-full appearance-none py-3 pl-3 pr-6 rounded-lg text-xs font-bold transition-all outline-none ${birthYear
                                        ? "bg-neon-pink/20 border-2 border-neon-pink text-white box-glow-pink"
                                        : "bg-[#111] border border-gray-700 text-gray-400 focus:border-neon-cyan"
                                        }`}
                                >
                                    <option value="" disabled>年</option>
                                    {[...Array(60)].map((_, i) => {
                                        const y = 2015 - i;
                                        return <option key={y} value={y}>{y}</option>;
                                    })}
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-gray-500 text-xs">▼</div>
                            </div>
                            <div className="relative w-full">
                                <select
                                    value={birthMonth}
                                    onChange={(e) => setBirthMonth(e.target.value)}
                                    className={`w-full appearance-none py-3 pl-3 pr-6 rounded-lg text-xs font-bold transition-all outline-none ${birthMonth
                                        ? "bg-neon-pink/20 border-2 border-neon-pink text-white box-glow-pink"
                                        : "bg-[#111] border border-gray-700 text-gray-400 focus:border-neon-cyan"
                                        }`}
                                >
                                    <option value="" disabled>月</option>
                                    {[...Array(12)].map((_, i) => (
                                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                                    ))}
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-gray-500 text-xs">▼</div>
                            </div>
                            <div className="relative w-full">
                                <select
                                    value={birthDay}
                                    onChange={(e) => setBirthDay(e.target.value)}
                                    className={`w-full appearance-none py-3 pl-3 pr-6 rounded-lg text-xs font-bold transition-all outline-none ${birthDay
                                        ? "bg-neon-pink/20 border-2 border-neon-pink text-white box-glow-pink"
                                        : "bg-[#111] border border-gray-700 text-gray-400 focus:border-neon-cyan"
                                        }`}
                                >
                                    <option value="" disabled>日</option>
                                    {[...Array(31)].map((_, i) => (
                                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                                    ))}
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-gray-500 text-xs">▼</div>
                            </div>
                        </div>
                    </div>

                    {/* MBTI Selection */}
                    <div className="bg-black border border-gray-800 rounded-2xl p-5 shadow-lg relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gray-800 to-gray-600 opacity-50"></div>
                        <h3 className="text-sm font-bold text-gray-300 mb-3 flex items-center justify-between">
                            <span className="flex items-center"><span className="text-neon-pink mr-2">▶</span> MBTI<span className="text-[10px] text-gray-500 ml-2">※わからない場合は「わからない」を選択</span></span>
                        </h3>
                        <div className="relative w-full">
                            <select
                                value={mbti}
                                onChange={(e) => setMbti(e.target.value)}
                                className={`w-full appearance-none py-3 pl-3 pr-6 rounded-lg text-xs font-bold transition-all outline-none ${mbti
                                    ? "bg-neon-pink/20 border-2 border-neon-pink text-white box-glow-pink"
                                    : "bg-[#111] border border-gray-700 text-gray-400 focus:border-neon-cyan"
                                    }`}
                            >
                                <option value="" disabled>MBTIを選択してください</option>
                                <option value="わからない">わからない</option>
                                {["ISTJ", "ISFJ", "INFJ", "INTJ", "ISTP", "ISFP", "INFP", "INTP", "ESTP", "ESFP", "ENFP", "ENTP", "ESTJ", "ESFJ", "ENFJ", "ENTJ"].map(type => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-gray-500 text-xs">▼</div>
                        </div>
                    </div>
                </div>

                <div className="w-full max-w-md mt-8 pb-8">
                    <button
                        onClick={submitToSpreadsheet}
                        className="w-full relative py-4 rounded-xl font-black text-lg tracking-wider transition-all overflow-hidden group 
                        bg-black border-2 border-neon-pink text-white shadow-[0_0_15px_rgba(255,0,255,0.4)] hover:shadow-[0_0_25px_rgba(255,0,255,0.6)]"
                    >
                        <span className="block absolute inset-0 bg-neon-pink/10 group-active:bg-neon-pink/30 transition-colors"></span>
                        <span className="relative z-10 drop-shadow-[0_0_5px_#FF00FF]">診断結果を見る</span>
                    </button>
                </div>
            </div>
        );
    }

    if (appState === "RESULT") {
        const result = getResult();
        const isPink = result.color === "pink";
        const bestMatchData = RESULTS.find(r => r.code === result.bestMatch);
        const worstMatchData = RESULTS.find(r => r.code === result.worstMatch);
        const yesPercentage = Math.round((answers.filter(a => a).length / QUESTIONS.length) * 100);

        return (
            <div className="flex-grow flex flex-col w-full pb-12 relative">
                {/* Scroll Anchor */}
                <div id="top-anchor" className="absolute top-0 left-0 w-full h-px opacity-0 pointer-events-none -z-50" />
                {/* Header Region */}
                <div className="pt-10 pb-4 text-center z-10">
                    <p className={`font-mono text-sm tracking-widest uppercase ${isPink ? "text-neon-pink text-glow-pink" : "text-neon-cyan text-glow-cyan"}`}>
                        [{result.code}] TYPE
                    </p>
                    <h1 className={`text-2xl sm:text-3xl font-black mt-2 mb-2 px-2 break-keep leading-snug ${isPink ? "text-glow-pink text-white" : "text-glow-cyan text-white"} animate-glitch`}>
                        {result.title}
                    </h1>
                    <h2 className="text-xl font-bold text-white mb-2">
                        地雷度: <span className={`text-4xl ml-1 ${isPink ? "text-neon-pink drop-shadow-[0_0_8px_#FF00FF]" : "text-neon-cyan drop-shadow-[0_0_8px_#00FFFF]"}`}>{yesPercentage}%</span>
                    </h2>
                    <p className="text-[#ededed] text-sm px-6 font-bold leading-relaxed mb-2 opacity-90 drop-shadow-md">
                        {result.catchphrase}
                    </p>
                </div>

                {/* Character Image with AI Watermark Hack */}
                <div className="relative w-full h-80 px-4 mb-6 z-0">
                    <div className={`relative w-full h-full rounded-2xl border-2 ${isPink ? "border-neon-pink box-glow-pink" : "border-neon-cyan box-glow-cyan"} ai-watermark-hide-wrapper`}>
                        {/* The actual image uses the hide hack class to over-scale and sink down */}
                        <Image
                            src={result.image}
                            alt={result.title}
                            fill
                            className="ai-watermark-hide-img object-cover object-top md:object-[center_10%]"
                            priority
                        />
                    </div>
                </div>

                {/* Description Region */}
                <div className="px-6 mb-8">
                    <div className="bg-[#0a0a0a] p-5 rounded-xl border border-gray-800 shadow-lg relative">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neon-cyan to-neon-pink opacity-50"></div>
                        <p className="text-gray-300 text-sm leading-relaxed mb-4">
                            {result.description}
                        </p>

                        {/* Compatibility Section */}
                        <div className="mt-4 pt-4 border-t border-gray-800 grid grid-cols-2 gap-4">
                            <div onClick={() => setMatchModal("best")} className="cursor-pointer hover:bg-white/5 p-2 rounded-lg transition-colors group border border-transparent hover:border-gray-800">
                                <p className="text-neon-pink text-xs font-bold mb-1 flex items-center justify-between">
                                    <span>▶ 相性の良いタイプ</span>
                                    <span className="text-gray-500 text-[10px] group-hover:text-white transition-colors">詳細を見る</span>
                                </p>
                                <p className="text-white text-[13px] font-bold">{bestMatchData?.title}</p>
                            </div>
                            <div onClick={() => setMatchModal("worst")} className="cursor-pointer hover:bg-white/5 p-2 rounded-lg transition-colors group border border-transparent hover:border-gray-800">
                                <p className="text-neon-cyan text-xs font-bold mb-1 flex items-center justify-between">
                                    <span>▶ 相性の悪いタイプ</span>
                                    <span className="text-gray-500 text-[10px] group-hover:text-white transition-colors">詳細を見る</span>
                                </p>
                                <p className="text-white text-[13px] font-bold">{worstMatchData?.title}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Actions Region */}
                <div className="px-6 space-y-4 flex-grow flex flex-col justify-end mt-auto">

                    {/* Primary Share Actions */}
                    <div className="flex flex-col space-y-3 mb-2">
                        <button
                            onClick={downloadImage}
                            disabled={isGenerating}
                            className={`flex items-center justify-center space-x-2 py-4 bg-gradient-to-r from-neon-pink/20 to-purple-600/20 border-2 border-neon-pink rounded-xl text-white font-black tracking-wide transition-all shadow-[0_0_15px_rgba(255,0,255,0.3)] hover:shadow-[0_0_25px_rgba(255,0,255,0.6)] group ${isGenerating ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            <Download size={20} className={isGenerating ? 'animate-bounce' : 'group-hover:animate-bounce'} />
                            <span>{isGenerating ? '画像生成中...' : '📸 診断結果を画像で保存'}</span>
                        </button>

                        <button
                            onClick={shareToTwitter}
                            className="flex items-center justify-center space-x-2 py-4 bg-black border-2 border-gray-700 hover:border-white rounded-xl text-white font-black tracking-widest transition-all hover:bg-white hover:text-black group"
                        >
                            <Twitter size={20} />
                            <span>𝕏 結果をXでポストする</span>
                        </button>

                        <button onClick={copyUrl} className="flex items-center justify-center space-x-2 py-3 bg-transparent border border-gray-800 hover:border-gray-500 rounded-lg text-gray-400 hover:text-white font-bold transition-all text-xs">
                            <span className="text-xs">URLを直接コピー</span>
                        </button>
                    </div>

                    <div className="pt-4 border-t border-gray-800 mt-2">
                        <a
                            href="https://example.com/affiliate-link"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center p-4 bg-gradient-to-r from-[#FF00FF]/20 to-[#00FFFF]/20 border border-gray-700 rounded-xl hover:bg-[#FF00FF]/30 transition-colors w-full group"
                        >
                            <LinkIcon size={18} className="text-white mr-2 group-hover:animate-pulse" />
                            <span className="font-bold text-white tracking-wide">相性の良い人を探す</span>
                        </a>
                        <p className="text-center text-[10px] text-gray-600 mt-2 font-mono">
                            PR // SPONSORED MATCHING SERVICE
                        </p>
                    </div>

                    {/* Return Navigation */}
                    <div className="pt-4 flex flex-col space-y-3 mt-4">
                        <button onClick={() => { setAppState("START"); setAnswers([]); setCurrentIndex(0); setGender(null); setBirthYear(""); setBirthMonth(""); setBirthDay(""); setMbti(""); }} className="p-3 w-full bg-[#111] hover:bg-[#222] border border-gray-700 rounded-xl text-white font-bold transition-all text-sm">
                            もう一度診断する
                        </button>
                        <Link href="/" className="p-3 w-full flex items-center justify-center bg-[#111] hover:bg-[#222] border border-gray-700 rounded-xl text-white font-bold transition-all text-sm">
                            JININトップへ戻る
                        </Link>
                    </div>
                </div>

                {/* Compatibility Modal */}
                {matchModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-md" onClick={() => setMatchModal(null)}>
                        <div className="bg-[#0a0a0a] border border-gray-800 shadow-[0_0_30px_rgba(0,0,0,0.8)] rounded-2xl w-full max-w-sm p-6 relative overflow-hidden" onClick={e => e.stopPropagation()}>
                            <button onClick={() => setMatchModal(null)} className="absolute top-4 right-4 text-gray-400 hover:text-white bg-black/50 rounded-full p-1 border border-gray-800">
                                <X size={20} />
                            </button>
                            {(() => {
                                const modalData = matchModal === "best" ? bestMatchData : worstMatchData;
                                const isBest = matchModal === "best";
                                return (
                                    <div className="text-center mt-2">
                                        <p className={`text-xs font-bold mb-2 ${isBest ? "text-neon-pink drop-shadow-[0_0_5px_#FF00FF]" : "text-neon-cyan drop-shadow-[0_0_5px_#00FFFF]"}`}>
                                            {isBest ? "▶ 最高の相性" : "▶ 最悪の相性"}
                                        </p>
                                        <h3 className="text-xl font-black text-white mb-2">{modalData?.title}</h3>
                                        <p className="text-xs font-bold text-gray-300 mb-4 px-2 leading-relaxed">{modalData?.catchphrase}</p>

                                        <div className="relative w-full h-48 rounded-xl overflow-hidden border border-gray-800 mb-4 bg-black">
                                            {modalData?.image && (
                                                <Image src={modalData.image} alt={modalData.title} fill className="object-cover object-top opacity-80" />
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                                        </div>

                                        <p className="text-xs text-gray-400 text-left leading-relaxed">
                                            {modalData?.description}
                                        </p>
                                    </div>
                                );
                            })()}
                        </div>
                    </div>
                )}

                {/* Hidden Share Card for Instagram / TikTok (9:16 Aspect Ratio) */}
                <div className="absolute top-[-9999px] left-[-9999px] -z-50 opacity-100 pointer-events-none overflow-hidden">
                    <div
                        id="share-card"
                        className="w-[1080px] h-[1920px] bg-[#050505] text-white p-16 flex flex-col items-center justify-center font-sans z-0"
                    >
                        <div className="relative z-10 w-full flex-grow flex flex-col items-center justify-center py-12 gap-y-12">
                            {/* Logo */}
                            <div className="w-[400px] relative flex flex-col items-center">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={base64Logo || "/jinin_logo.png"} alt="JININ" className="w-full object-contain" />
                                <p className="text-[20px] text-neon-cyan font-mono font-black tracking-[0.5em] mt-4">#隠れ地雷度診断</p>
                            </div>

                            {/* Character Image */}
                            <div className="relative w-[700px] h-[700px] shrink-0 rounded-full overflow-hidden bg-[#0A0A0A] z-20 border-8 border-gray-900 border-b-neon-pink flex items-center justify-center">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={base64Avatar || result.image} alt={result.title} className="w-[110%] h-[110%] object-cover object-top" />
                            </div>

                            {/* Result Title */}
                            <div className="text-center px-16">
                                <h1 className="text-6xl font-black mb-6 leading-tight text-neon-pink">
                                    {result.title}
                                </h1>
                                <div className="inline-block px-10 py-5 bg-[#111] border-4 border-gray-800 rounded-full shadow-2xl">
                                    <p className="text-3xl font-bold text-gray-300">
                                        地雷度 <span className="text-5xl ml-4 font-black text-neon-pink">{yesPercentage}%</span>
                                    </p>
                                </div>
                            </div>

                            {/* Footer (Catchphrase) */}
                            <div className="w-full text-center px-16">
                                <p className="text-3xl font-bold leading-[1.8] text-gray-300 whitespace-pre-wrap break-words">
                                    {result.catchphrase}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return null;
}
