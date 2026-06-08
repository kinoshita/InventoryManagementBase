import { Head, useForm, usePage } from '@inertiajs/react';

export default function VerifyEmail() {
    const { post: resendPost, processing: resendProcessing } = useForm({});
    const { post: logoutPost, processing: logoutProcessing } = useForm({});
    const { status } = usePage().props;

    function resend(e) {
        e.preventDefault();
        resendPost('/email/verification-notification');
    }

    function logout(e) {
        e.preventDefault();
        logoutPost('/logout');
    }

    return (
        <>
            <Head title="メールアドレスの確認" />
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                        メールアドレスの確認
                    </h1>

                    <p className="text-gray-600 mb-6 text-center">
                        登録いただいたメールアドレスに確認メールを送信しました。
                        メール内のリンクをクリックして登録を完了してください。
                    </p>

                    {status === 'verification-link-sent' && (
                        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md text-green-700 text-sm text-center">
                            確認メールを再送しました。
                        </div>
                    )}

                    <form onSubmit={resend}>
                        <button
                            type="submit"
                            disabled={resendProcessing}
                            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 font-medium"
                        >
                            確認メールを再送する
                        </button>
                    </form>

                    <form onSubmit={logout} className="mt-3">
                        <button
                            type="submit"
                            disabled={logoutProcessing}
                            className="w-full text-sm text-gray-500 hover:text-gray-700 underline"
                        >
                            ログアウト
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
