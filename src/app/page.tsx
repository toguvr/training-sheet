import { api } from '@/services/api';

export default async function Home() {
  const { data } = await api.get('/training-name');

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm ">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit ">
          Escolha seu treino&nbsp;
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black ">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 "
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By TOGU
          </a>
        </div>
      </div>

      <div className="mb-32 grid text-center ">
        {data &&
          data.map(
            (training: {
              ts: number;
              data: { id: string; name: string; description: string };
            }) => (
              <a
                key={training.ts}
                href={`/wod/${training.data.id}`}
                className="group m-6 rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800 hover:dark:bg-opacity-30"
              >
                <h2 className={`mb-3 text-2xl font-semibold`}>
                  {training.data.name}
                  <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                    -&gt;
                  </span>
                </h2>
                <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                  {training.data.description}
                </p>
              </a>
            )
          )}
      </div>
    </main>
  );
}
