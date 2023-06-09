import VideoEmbed from '@/components/youtube';
import { api } from '@/services/api';
import React from 'react';

export default async function Home({
  params,
}: {
  params: { nameId: string; week: string; weekDay: string };
}) {
  const weekName = [
    'Domingo',
    'Segunda',
    'Terça',
    'Quarta',
    'Quinta',
    'Sexta',
    'Sábado',
  ];
  const { data } = await api.get(
    `/wod/${params.nameId}/${params.week}/${params.weekDay}`
  );

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Semana {params.week} - {weekName[Number(params.weekDay)]}
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By TOGU
          </a>
        </div>
      </div>

      <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left">
        {data?.name.split('\n').map((linha: string, index: number) => {
          // Define a expressão regular para encontrar URLs do YouTube
          const youtubeRegex =
            /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(\w+)/;

          // Tenta encontrar um match da expressão regular na frase
          const match = linha.match(youtubeRegex);

          if (match) {
            // Extrai o ID do vídeo do match
            const videoId = match[1];
            console.log(match);
            // Retorna o embed do YouTube
            return (
              <React.Fragment key={index}>
                <VideoEmbed key={index} url={linha} /> <br />
              </React.Fragment>
            );
          } else {
            // Caso não haja match, retorna a frase original
            return (
              <React.Fragment key={index}>
                {linha}
                <br />
              </React.Fragment>
            );
          }
        })}
      </div>
    </main>
  );
}
