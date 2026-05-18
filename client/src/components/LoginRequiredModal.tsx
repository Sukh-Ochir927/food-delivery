type LoginRequiredModalProps = {
  onClose: () => void;
  onLogin: () => void;
  onSignup: () => void;
};

export function LoginRequiredModal({ onClose, onLogin, onSignup }: LoginRequiredModalProps) {
  return (
    <div className="fixed inset-0 z-[60] grid place-items-center bg-black/70 p-4">
      <div className="w-full max-w-sm rounded-3xl bg-white p-6 text-center text-[#171717] shadow-2xl">
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="ml-auto grid h-9 w-9 place-items-center rounded-full bg-neutral-100 text-lg font-bold"
        >
          x
        </button>
        <h2 className="mt-2 text-2xl font-black">You need to log in first</h2>
        <div className="mt-7 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={onLogin}
            className="h-12 rounded-full bg-[#ef4444] text-sm font-black text-white"
          >
            Log in
          </button>
          <button
            type="button"
            onClick={onSignup}
            className="h-12 rounded-full border border-neutral-300 text-sm font-black"
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
}
