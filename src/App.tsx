import { useState } from 'react';

type VideoItem = {
  id: string;
  title: string;
  description: string;
  src: string;
};

const VIDEO_ITEMS: VideoItem[] = [
  {
    id: 'geumnam-ro',
    title: '금남로의 기록',
    description:
      '거리 위에 남겨진 시민들의 발걸음과 당시의 긴장감을 복원 영상으로 마주합니다.',
    src: '',
  },
  {
    id: 'citizen-voice',
    title: '시민의 목소리',
    description:
      '흐릿한 기록 속에서도 사라지지 않은 증언과 연대의 순간을 되새깁니다.',
    src: '',
  },
  {
    id: 'memory-place',
    title: '기억의 현장',
    description:
      '오늘의 우리가 다시 바라봐야 할 역사적 장면들을 차분히 조명합니다.',
    src: '',
  },
];

type EntryScreenProps = {
  onEnter: () => void;
};

type ExhibitionScreenProps = {
  selectedVideo: VideoItem;
  onSelectVideo: (video: VideoItem) => void;
  onReturn: () => void;
};

type VideoCardProps = {
  video: VideoItem;
  isSelected: boolean;
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
            5.18 민주화운동 AI 영상 복원관
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
  selectedVideo,
  onSelectVideo,
  onReturn,
}: ExhibitionScreenProps) => {
  return (
    <main className="min-h-screen bg-[#08090b] px-5 py-8 text-stone-100 sm:px-8 lg:px-12">
      <section className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl animate-[fadeIn_600ms_ease-out] flex-col gap-8">
        <header className="flex flex-col gap-5 border-b border-stone-700/60 pb-7 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-stone-50 sm:text-4xl">
              5.18 민주화운동 AI 영상 복원관
            </h1>
            <p className="mt-4 text-base leading-7 text-stone-300">
              아래 기록 중 하나를 선택해 복원된 영상을 감상해보세요.
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

        <section className="flex flex-col gap-8">
          <div className="border border-stone-700/70 bg-black/40 p-4 shadow-2xl shadow-black/30">
            {selectedVideo.src ? (
              <video
                key={selectedVideo.id}
                className="aspect-video w-full bg-black"
                src={selectedVideo.src}
                controls
                autoPlay
                muted
                playsInline
              >
                현재 브라우저에서는 영상을 재생할 수 없습니다.
              </video>
            ) : (
              <div className="flex aspect-video flex-col items-center justify-center border border-dashed border-stone-600 bg-stone-950/80 px-6 text-center">
                <p className="text-sm font-medium tracking-[0.18em] text-red-100/70">
                  SELECTED RECORD
                </p>
                <h2 className="mt-4 text-2xl font-semibold text-stone-50">
                  {selectedVideo.title}
                </h2>
                <p className="mt-4 max-w-md text-sm leading-6 text-stone-300">
                  추후 복원 영상 삽입 예정
                </p>
              </div>
            )}
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {VIDEO_ITEMS.map((video) => (
              <VideoCard
                key={video.id}
                video={video}
                isSelected={video.id === selectedVideo.id}
                onSelect={() => onSelectVideo(video)}
              />
            ))}
          </div>
        </section>
      </section>
    </main>
  );
};

const VideoCard = ({ video, isSelected, onSelect }: VideoCardProps) => {
  return (
    <button
      className={`group border p-4 text-left transition duration-300 focus:outline-none focus:ring-2 focus:ring-red-200/40 ${
        isSelected
          ? 'border-red-300/60 bg-red-950/35'
          : 'border-stone-700/70 bg-stone-950/45 hover:border-red-300/40 hover:bg-stone-900/80'
      }`}
      type="button"
      onClick={onSelect}
      aria-pressed={isSelected}
    >
      <div
        className={`flex aspect-video items-center justify-center border border-dashed text-xs font-medium tracking-[0.14em] transition duration-300 ${
          isSelected
            ? 'border-red-200/40 bg-black/50 text-red-100/80'
            : 'border-stone-600 bg-black/30 text-stone-400 group-hover:text-stone-200'
        }`}
      >
        {video.src ? 'VIDEO READY' : 'VIDEO AREA'}
      </div>
      <h3 className="mt-4 text-lg font-semibold text-stone-50">
        {video.title}
      </h3>
      <p className="mt-2 text-sm leading-6 text-stone-300">
        {video.description}
      </p>
    </button>
  );
};

const App = () => {
  const [hasEntered, setHasEntered] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<VideoItem>(VIDEO_ITEMS[0]);

  if (!hasEntered) {
    return <EntryScreen onEnter={() => setHasEntered(true)} />;
  }

  return (
    <ExhibitionScreen
      selectedVideo={selectedVideo}
      onSelectVideo={setSelectedVideo}
      onReturn={() => setHasEntered(false)}
    />
  );
};

export default App;
