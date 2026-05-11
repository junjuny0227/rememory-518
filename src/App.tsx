import { useState } from 'react';

type VideoItem = {
  id: string;
  title: string;
  description: string;
  src: string;
};

const VIDEO_ITEMS: VideoItem[] = [
  {
    id: 'yoon-sang-won',
    title: '윤상원',
    description:
      '끝까지 전남도청을 지키며 오늘의 민주주의를 남겨주신 시민군 대변인.',
    src: '/videos/1.mp4',
  },
  {
    id: 'park-yong-joon',
    title: '박용준',
    description:
      '침묵 속에서도 광주의 진실을 세상에 알리고자 기록을 멈추지 않으신 열사.',
    src: '/videos/2.mp4',
  },
  {
    id: 'moon-jae-hak',
    title: '문재학',
    description:
      '어린 나이에도 사랑하는 사람들과 광주를 지키기 위해 끝까지 함께하신 고등학생 시민군.',
    src: '/videos/3.mp4',
  },
];

type EntryScreenProps = {
  onEnter: () => void;
};

type ExhibitionScreenProps = {
  playingVideo: VideoItem | null;
  onPlayVideo: (video: VideoItem) => void;
  onReturn: () => void;
};

type VideoCardProps = {
  video: VideoItem;
  isPlaying: boolean;
  onSelect: () => void;
};

const EntryScreen = ({ onEnter }: EntryScreenProps) => {
  return (
    <main className="min-h-screen overflow-hidden bg-[#070709] text-stone-100">
      <section className="relative flex min-h-screen items-center justify-center px-6 py-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(127,29,29,0.18),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.04),transparent_42%)]" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-black/70 to-transparent" />

        <div className="relative mx-auto flex max-w-4xl animate-[fadeIn_700ms_ease-out] flex-col items-center text-center">
          <p className="mb-5 border border-red-900/50 px-4 py-2 text-sm font-medium tracking-[0.18em] text-red-100/80">
            DIGITAL RESTORATION EXHIBITION
          </p>
          <h1 className="text-4xl font-semibold leading-tight text-stone-50 sm:text-5xl lg:text-7xl">
            5·18 민주화운동 AI 영상 복원관
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-8 text-stone-300 sm:text-lg">
            흐릿했던 기록을 다시 선명하게, 우리가 기억해야 할 그날의 이야기를
            마주합니다.
          </p>
          <button
            className="mt-11 border border-red-300/30 bg-red-950/70 px-7 py-4 text-base font-semibold text-stone-50 transition duration-300 hover:border-red-200/60 hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-red-200/50 focus:ring-offset-2 focus:ring-offset-black"
            type="button"
            onClick={onEnter}
          >
            전시관 입장하기
          </button>
        </div>
      </section>
    </main>
  );
};

const ExhibitionScreen = ({
  playingVideo,
  onPlayVideo,
  onReturn,
}: ExhibitionScreenProps) => {
  return (
    <main className="min-h-screen bg-[#08090b] px-5 py-8 text-stone-100 sm:px-8 lg:px-12">
      <section className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl animate-[fadeIn_600ms_ease-out] flex-col gap-8">
        <header className="flex flex-col gap-5 border-b border-stone-700/60 pb-7 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-stone-50 sm:text-4xl">
              5·18 민주화운동 AI 영상 복원관
            </h1>
            <p className="mt-4 text-base leading-7 text-stone-300">
              세로형 기록 카드를 클릭해 복원된 영상을 감상해보세요.
            </p>
          </div>
          <button
            className="w-fit border border-stone-600 px-4 py-3 text-sm font-medium text-stone-200 transition duration-300 hover:border-red-300/60 hover:bg-red-950/40 focus:outline-none focus:ring-2 focus:ring-red-200/40"
            type="button"
            onClick={onReturn}
          >
            처음으로 돌아가기
          </button>
        </header>

        <section className="rounded-[28px] border border-stone-700/70 bg-black/35 px-4 py-6 shadow-2xl shadow-black/30 sm:px-8 lg:px-12">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {VIDEO_ITEMS.map((video) => (
              <VideoCard
                key={video.id}
                video={video}
                isPlaying={video.id === playingVideo?.id}
                onSelect={() => onPlayVideo(video)}
              />
            ))}
          </div>
        </section>
      </section>
    </main>
  );
};

const VideoCard = ({ video, isPlaying, onSelect }: VideoCardProps) => {
  return (
    <article
      className={`group flex min-h-full flex-col overflow-hidden rounded-2xl border bg-stone-950/65 text-left transition duration-300 ${
        isPlaying
          ? 'border-red-300/60 bg-red-950/35'
          : 'border-stone-700/70 bg-stone-950/45 hover:border-red-300/40 hover:bg-stone-900/80'
      }`}
    >
      <div className="relative aspect-[9/16] w-full overflow-hidden bg-black">
        {isPlaying && video.src ? (
          <video
            key={video.id}
            className="h-full w-full bg-black object-cover"
            src={video.src}
            controls
            autoPlay
            muted
            playsInline
          >
            현재 브라우저에서는 영상을 재생할 수 없습니다.
          </video>
        ) : (
          <button
            className="flex h-full w-full flex-col items-center justify-center border-b border-stone-700/70 bg-stone-950/80 px-5 text-center focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-200/40"
            type="button"
            onClick={onSelect}
            aria-pressed={isPlaying}
            aria-label={`${video.title} 영상 재생`}
          >
            <span
              className={`flex h-24 w-24 items-center justify-center rounded-full border transition duration-300 ${
                isPlaying
                  ? 'border-red-200/60 text-red-100'
                  : 'border-stone-500 text-stone-200 group-hover:border-red-200/60 group-hover:text-red-100'
              }`}
              aria-hidden="true"
            >
              <span className="ml-1 h-0 w-0 border-y-[18px] border-l-[28px] border-y-transparent border-l-current" />
            </span>
            <span className="mt-10 h-1 w-28 rounded-full bg-stone-500/70" />
            <span className="mt-8 text-xs font-medium tracking-[0.14em] text-stone-400">
              {video.src ? 'CLICK TO PLAY' : 'VIDEO READY SOON'}
            </span>
          </button>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-semibold text-stone-50">{video.title}</h3>
        <p className="mt-2 text-sm leading-6 text-stone-300">
          {video.description}
        </p>
      </div>
    </article>
  );
};

const App = () => {
  const [hasEntered, setHasEntered] = useState(false);
  const [playingVideo, setPlayingVideo] = useState<VideoItem | null>(null);

  if (!hasEntered) {
    return <EntryScreen onEnter={() => setHasEntered(true)} />;
  }

  return (
    <ExhibitionScreen
      playingVideo={playingVideo}
      onPlayVideo={setPlayingVideo}
      onReturn={() => setHasEntered(false)}
    />
  );
};

export default App;
