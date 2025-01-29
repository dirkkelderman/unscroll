import { ResetPasswordForm } from "../forms/reset-password-form";

export default function ResetPasswordPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Reset Password</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Enter your new password below.
          </p>
        </div>
        <ResetPasswordForm />
      </div>
    </div>
  );
}
