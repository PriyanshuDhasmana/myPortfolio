export default function SpotifyPlaylist() {
  return (
    <section className="flex flex-col items-center justify-center py-8">
      <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-center text-white">
        🎧 My Spotify Playlist
      </h2>
      <iframe
        style={{ borderRadius: "12px" }}
        src="https://open.spotify.com/embed/playlist/31jLDE8PIEQYRqd68z644W?utm_source=generator"
        width="100%"
        height="352"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        className="max-w-2xl w-full shadow-lg shadow-[#8245ec]/40"
      ></iframe>
    </section>
  );
}
