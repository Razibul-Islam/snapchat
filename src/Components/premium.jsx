// eslint-disable-next-line react/prop-types
export default function Premium({ next }) {
  return (
    <div className="relative min-h-dvh flex items-center justify-center p-4 text-center">
      <div className="bg-neutral-50 w-full max-w-[25rem] p-6 rounded-xl flex flex-col">
        <p className="text-2xl font-semibold">Upgrade To Premium</p>
        <p className="mt-4 mb-7 [&>span]:font-semibold">
          Based on our <span className="text-yellow-400">users feedback</span>
          to prevent <span className="text-yellow-400">bot</span> activity we
          are allowing only <span className="text-yellow-400">premium</span>{" "}
          users to use our platform. We are always focused on our users good
          experience
        </p>
        <button
          onClick={next}
          className="h-11 rounded text-neutral-50 font-medium bg-yellow-400 disabled:bg-yellow-200"
        >
          Premium 0.10$
        </button>
      </div>
    </div>
  );
}
