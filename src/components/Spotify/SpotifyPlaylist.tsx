export default function SpotifyPlaylist() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 rounded-[1.75rem] bg-[#08101f]/80 p-6 text-center text-slate-100 shadow-[0_30px_90px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:p-8">
      <h2 className="text-2xl md:text-3xl font-semibold text-white">🎧 My Spotify Playlist</h2>
      <iframe
        style={{ borderRadius: '20px' }}
        src="https://open.spotify.com/embed/playlist/31jLDE8PIEQYRqd68z644W?utm_source=generator"
        width="100%"
        height="352"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        className="max-w-2xl w-full border border-white/10 bg-[#05060f]/90 shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
      ></iframe>
    </div>
  );
}
