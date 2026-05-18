import { useState } from 'react';

type VideoItem = {
  id: string;
  title: string;
  description: string;
  src: string;
  thumbnailSrc: string;
};

const VIDEO_ITEMS: VideoItem[] = [
  {
    id: 'yoon-sang-won',
    title: '윤상원',
    description:
      '끝까지 전남도청을 지키며 오늘의 민주주의를 남겨주신 시민군 대변인.',
    src: '/videos/1.mp4',
    thumbnailSrc: '/images/1.png',
  },
  {
    id: 'park-yong-joon',
    title: '박용준',
    description:
      '침묵 속에서도 광주의 진실을 세상에 알리고자 기록을 멈추지 않으신 열사.',
    src: '/videos/2.mp4',
    thumbnailSrc: '/images/2.png',
  },
  {
    id: 'moon-jae-hak',
    title: '문재학',
    description:
      '어린 나이에도 사랑하는 사람들과 광주를 지키기 위해 끝까지 함께하신 고등학생 시민군.',
    src: '/videos/3.mp4',
    thumbnailSrc: '/images/3.png',
  },
];

const ENTRY_PREVIEW_IMAGES = [
  {
    src: '/images/1.png',
    className: 'entry-preview-one',
  },
  {
    src: '/images/2.png',
    className: 'entry-preview-two',
  },
  {
    src: '/images/3.png',
    className: 'entry-preview-three',
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
  hasActiveVideo: boolean;
  onSelect: () => void;
};

const EntryScreen = ({ onEnter }: EntryScreenProps) => {
  return (
    <main className="entry-screen">
      <section className="entry-section">
        <div className="entry-glow" />
        <div className="entry-vignette" />
        <div className="entry-preview-layer" aria-hidden="true">
          {ENTRY_PREVIEW_IMAGES.map((image) => (
            <div
              key={image.src}
              className={`entry-preview ${image.className}`}
            >
              <div className="entry-tape" />
              <img className="entry-preview-image" src={image.src} alt="" />
            </div>
          ))}
        </div>
        <div className="entry-scrim" />

        <div className="entry-content">
          <p className="entry-kicker">
            DIGITAL RESTORATION EXHIBITION
          </p>
          <h1 className="entry-title">
            5·18 민주화운동 AI 영상 복원관
          </h1>
          <p className="entry-copy">
            흐릿했던 기록을 다시 선명하게, 우리가 기억해야 할 그날의 이야기를
            마주합니다.
          </p>
          <button
            className="primary-button"
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
    <main className="exhibition-screen">
      <section className="exhibition-shell">
        <header className="exhibition-header">
          <div>
            <h1 className="exhibition-title">
              5·18 민주화운동 AI 영상 복원관
            </h1>
            <p className="exhibition-copy">
              세로형 기록 카드를 클릭해 복원된 영상을 감상해보세요.
            </p>
          </div>
          <button
            className="secondary-button"
            type="button"
            onClick={onReturn}
          >
            처음으로 돌아가기
          </button>
        </header>

        <section className="cards-panel">
          <div className="video-grid">
            {VIDEO_ITEMS.map((video) => (
              <VideoCard
                key={video.id}
                video={video}
                isPlaying={video.id === playingVideo?.id}
                hasActiveVideo={playingVideo !== null}
                onSelect={() => onPlayVideo(video)}
              />
            ))}
          </div>
        </section>
      </section>
    </main>
  );
};

const VideoCard = ({
  video,
  isPlaying,
  hasActiveVideo,
  onSelect,
}: VideoCardProps) => {
  return (
    <article
      className={`video-card ${
        isPlaying ? 'video-card-active' : 'video-card-idle'
      } ${
        !isPlaying && hasActiveVideo ? 'video-card-dimmed' : ''
      }`}
    >
      {isPlaying ? <div className="video-card-glow" /> : null}
      <div className="video-frame">
        {isPlaying && video.src ? (
          <>
            <video
              key={video.id}
              className="video-player"
              src={video.src}
              poster={video.thumbnailSrc}
              controls
              autoPlay
              playsInline
            >
              현재 브라우저에서는 영상을 재생할 수 없습니다.
            </video>
            <div className="playing-badge">
              재생 중
            </div>
          </>
        ) : (
          <button
            className="poster-button"
            type="button"
            onClick={onSelect}
            aria-pressed={isPlaying}
            aria-label={`${video.title} 영상 재생`}
          >
            <img
              className="poster-image"
              src={video.thumbnailSrc}
              alt=""
            />
            <span className="poster-gradient" />
            <span className="play-circle" aria-hidden="true">
              <span className="play-icon" />
            </span>
            <span className="poster-line" />
            <span className="poster-label">
              {video.src ? 'CLICK TO PLAY' : 'VIDEO READY SOON'}
            </span>
          </button>
        )}
      </div>
      <div className="video-copy">
        <h3 className="video-title">{video.title}</h3>
        <p className="video-description">
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
