import React from "react";
import Link from "next/link";
import { ShieldAlert, ArrowLeft } from "lucide-react";

export default function PrivacyPolicyPage() {
    return (
        <div className="flex flex-col min-h-screen px-6 py-10 bg-black text-gray-300 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neon-cyan to-neon-pink z-10"></div>

            <div className="relative z-10">
                <Link href="/" className="inline-flex items-center text-gray-400 hover:text-neon-cyan transition-colors mb-8 text-sm group">
                    <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                    トップページへ戻る
                </Link>

                <div className="flex items-center mb-8">
                    <ShieldAlert className="text-neon-cyan mr-3 drop-shadow-[0_0_8px_#00FFFF]" size={28} />
                    <h1 className="text-2xl font-black text-white tracking-wider text-glow-cyan text-balance">
                        プライバシーポリシー
                    </h1>
                </div>

                <div className="space-y-8 text-sm leading-loose">
                    <section>
                        <h2 className="text-xl font-bold text-neon-pink mb-4 border-b border-gray-800 pb-2">
                            1. 取得する情報について
                        </h2>
                        <p>
                            当プラットフォーム「JININ」では、診断結果の精度向上およびマーケティングデータの分析を目的として、ユーザーの「生年月日」「性別」および「診断の回答データ」を匿名情報として取得・蓄積しています。氏名や住所、電話番号など、個人を特定できる情報は一切取得しておりません。
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-neon-pink mb-4 border-b border-gray-800 pb-2">
                            2. アクセス解析ツールについて
                        </h2>
                        <p>
                            当サイトでは、サービスの向上・改善のためにGoogleによるアクセス解析ツール「Googleアナリティクス」を利用する場合があります。これにはトラフィックデータの収集のためにCookieを使用していますが、データは匿名で収集されており、個人を特定するものではありません。
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-neon-pink mb-4 border-b border-gray-800 pb-2">
                            3. 広告の配信について
                        </h2>
                        <p>
                            当サイトは、第三者配信の広告サービス（アフィリエイトプログラム）を利用する予定です。ユーザーの興味に応じた商品やサービスの広告を表示するため、Cookieを使用することがあります。
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-neon-pink mb-4 border-b border-gray-800 pb-2">
                            4. 免責事項
                        </h2>
                        <p>
                            当プラットフォームの診断結果はエンターテインメントを目的としたものであり、医学的・心理学的な正確性を保証するものではありません。当サイトの利用により生じたトラブルや損害について、運営者は一切の責任を負いかねます。あらかじめご了承ください。
                        </p>
                    </section>
                </div>

                <div className="mt-16 pt-8 border-t border-gray-900 flex flex-col items-center justify-center">
                    <Link href="/" className="mb-6 px-8 py-3 bg-[#111] hover:bg-[#222] border border-gray-800 rounded-xl text-gray-300 hover:text-white font-bold transition-all text-sm flex items-center group">
                        <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                        JININトップへ戻る
                    </Link>
                    <p className="text-xs text-gray-600 font-mono">
                        © {new Date().getFullYear()} JININ PROJECT.
                    </p>
                </div>
            </div>
        </div>
    );
}
