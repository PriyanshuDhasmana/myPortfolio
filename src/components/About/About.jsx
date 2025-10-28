import React, { useCallback } from 'react';
import ReactTypingEffect from 'react-typing-effect';
import Tilt from 'react-parallax-tilt';
import { Particles } from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';
import profileImage from '../../assets/profile2.png';
import SpotifyPlaylist from "../Spotify/SpotifyPlaylist";

const About = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <div className="relative overflow-hidden">
      {/* ===== COMET BACKGROUND ===== */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        className="absolute inset-0 -z-10"
        options={{
          fullScreen: { enable: false },
          background: { color: "transparent" },
          fpsLimit: 60,
          detectRetina: true,
          particles: {
            number: { value: 25 },
            color: { value: ["#8245ec", "#3b82f6"] },
            shape: { type: "circle" },
            size: { value: { min: 1, max: 3 } },
            opacity: { value: 0.6 },
            move: {
              enable: true,
              speed: 8,
              direction: "top-right",
              straight: true,
              outModes: { default: "out" },
              trail: {
                enable: true,
                length: 6,
                fillColor: "transparent",
              },
            },
          },
          interactivity: {
            events: { onHover: { enable: false }, onClick: { enable: false } },
          },
        }}
      />

      <section
        id="about"
        className="py-4 px-[7vw] md:px-[7vw] lg:px-[20vw] font-sans mt-16 md:mt-24 lg:mt-32 space-y-24 relative z-10"
      >
        {/* ===================== SECTION 1 ===================== */}
        <div className="flex flex-col-reverse md:flex-row justify-between items-start md:items-center">
          {/* LEFT SIDE - About Content */}
          <div className="md:w-1/2 text-center md:text-left mt-8 md:mt-0">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 leading-tight">
              Hi, I am
            </h1>

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
              Priyanshu Dhasmana
            </h2>

            <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4 text-[#8245ec] leading-tight">
              <span className="text-white">I am a </span>
              <ReactTypingEffect
                text={[
                  'Fullstack Developer',
                  'Graphic Designer',
                  'UI/UX Designer',
                  'Coder',
                ]}
                speed={100}
                eraseSpeed={50}
                typingDelay={500}
                eraseDelay={2000}
                cursorRenderer={(cursor) => (
                  <span className="text-[#8245ec]">{cursor}</span>
                )}
              />
            </h3>

            <p className="text-base sm:text-lg md:text-lg text-gray-400 mb-10 mt-8 leading-relaxed">
              I am a full-stack developer with experience in building scalable web applications.
              I have a passion for graphic designing and professional video editing.
              Let’s get in touch if you have any projects in mind!
            </p>

            <a
              href="https://drive.google.com/file/d/1_pLl2wjYVCU-wnqXIhjhYr0YC0SJXvwv/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-white py-3 px-8 rounded-full mt-5 text-lg font-bold transition duration-300 transform hover:scale-105"
              style={{
                background: 'linear-gradient(90deg, #8245ec, #a855f7)',
                boxShadow: '0 0 2px #8245ec, 0 0 2px #8245ec, 0 0 40px #8245ec',
              }}
            >
              DOWNLOAD CV
            </a>
          </div>

          {/* RIGHT SIDE - Profile Image */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-end mt-8 md:mt-0">
            <Tilt
              className="w-48 h-48 sm:w-64 sm:h-64 md:w-[28rem] md:h-[28rem] border-4 border-purple-700 rounded-full mx-auto md:mx-0"
              tiltMaxAngleX={20}
              tiltMaxAngleY={20}
              perspective={1000}
              scale={1.05}
              transitionSpeed={1000}
              gyroscope={true}
            >
              <img
                src={profileImage}
                alt="Priyanshu Dhasmana"
                className="w-full h-full rounded-full object-cover drop-shadow-[0_10px_20px_rgba(130,69,236,0.5)]"
              />
            </Tilt>
          </div>
        </div>

        {/* ============= SECOND SECTION ============= */}
        <div className="mt-24 flex flex-col md:flex-row justify-between gap-10">
          {/* LEFT - Spotify */}
          <div className="md:w-1/2 w-full relative overflow-hidden rounded-2xl border border-[#8245ec]/30 bg-white/5 backdrop-blur-sm shadow-[0_0_25px_rgba(130,69,236,0.15)] transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(130,69,236,0.25)]">
            <div className="relative z-10 p-6">
              <h2 className="text-2xl font-bold text-white mb-4">My Playlist</h2>
              <iframe
                style={{ borderRadius: '12px' }}
                src="https://open.spotify.com/embed/playlist/31jLDE8PIEQYRqd68z644W?utm_source=generator"
                width="100%"
                height="380"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              ></iframe>
            </div>
          </div>

          {/* RIGHT - Gallery */}
          <div className="md:w-1/2 w-full relative overflow-hidden rounded-2xl border border-[#3b82f6]/30 bg-white/5 backdrop-blur-sm shadow-[0_0_25px_rgba(59,130,246,0.15)] transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(130,69,236,0.25)] flex flex-col justify-center items-center text-center">
            <div className="relative z-10 p-6">
              <h2 className="text-2xl font-bold text-white mb-4">My Gallery</h2>
              <p className="text-gray-300 mb-8 text-sm sm:text-base">
                A creative showcase section where I’ll soon display my design work, project snaps, and favorite visuals.
              </p>
              <button
                className="px-8 py-3 rounded-full text-lg font-bold text-white transition duration-300 transform hover:scale-105"
                style={{
                  background: 'linear-gradient(90deg, #3b82f6, #8245ec)',
                  boxShadow: '0 0 12px #3b82f6, 0 0 24px #8245ec',
                }}
              >
                COMING SOON
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;




// import React from 'react';
// import ReactTypingEffect from 'react-typing-effect';
// import Tilt from 'react-parallax-tilt';
// import profileImage from '../../assets/profile2.png';
// import SpotifyPlaylist from "../Spotify/SpotifyPlaylist";

// const About = () => {
//   return (
//     <section
//       id="about"
//       className="py-4 px-[7vw] md:px-[7vw] lg:px-[20vw] font-sans mt-16 md:mt-24 lg:mt-32 space-y-24"
//     >
//       {/* ===================== SECTION 1 ===================== */}
//       <div className="flex flex-col-reverse md:flex-row justify-between items-start md:items-center">
//         {/* LEFT SIDE - About Content */}
//         <div className="md:w-1/2 text-center md:text-left mt-8 md:mt-0">
//           <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 leading-tight">
//             Hi, I am
//           </h1>

//           <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
//             Priyanshu Dhasmana
//           </h2>

//           <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4 text-[#8245ec] leading-tight">
//             <span className="text-white">I am a </span>
//             <ReactTypingEffect
//               text={[
//                 'Fullstack Developer',
//                 'Graphic Designer',
//                 'UI/UX Designer',
//                 'Coder',
//               ]}
//               speed={100}
//               eraseSpeed={50}
//               typingDelay={500}
//               eraseDelay={2000}
//               cursorRenderer={(cursor) => (
//                 <span className="text-[#8245ec]">{cursor}</span>
//               )}
//             />
//           </h3>

//           <p className="text-base sm:text-lg md:text-lg text-gray-400 mb-10 mt-8 leading-relaxed">
//             I am a full-stack developer with experience in building scalable web applications.
//             I have a passion for graphic designing and professional video editing.
//             Let’s get in touch if you have any projects in mind!
//           </p>

//           <a
//             href="https://drive.google.com/file/d/1_pLl2wjYVCU-wnqXIhjhYr0YC0SJXvwv/view?usp=sharing"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="inline-block text-white py-3 px-8 rounded-full mt-5 text-lg font-bold transition duration-300 transform hover:scale-105"
//             style={{
//               background: 'linear-gradient(90deg, #8245ec, #a855f7)',
//               boxShadow: '0 0 2px #8245ec, 0 0 2px #8245ec, 0 0 40px #8245ec',
//             }}
//           >
//             DOWNLOAD CV
//           </a>
//         </div>

//         {/* RIGHT SIDE - Profile Image */}
//         <div className="w-full md:w-1/2 flex justify-center md:justify-end mt-8 md:mt-0">
//           <Tilt
//             className="w-48 h-48 sm:w-64 sm:h-64 md:w-[28rem] md:h-[28rem] border-4 border-purple-700 rounded-full mx-auto md:mx-0"
//             tiltMaxAngleX={20}
//             tiltMaxAngleY={20}
//             perspective={1000}
//             scale={1.05}
//             transitionSpeed={1000}
//             gyroscope={true}
//           >
//             <img
//               src={profileImage}
//               alt="Priyanshu Dhasmana"
//               className="w-full h-full rounded-full object-cover drop-shadow-[0_10px_20px_rgba(130,69,236,0.5)]"
//             />
//           </Tilt>
//         </div>

//       </div>


//       {/* ============= SECOND SECTION ============= */}
//       <div className="mt-24 flex flex-col md:flex-row justify-between gap-10">

//         {/* LEFT - Spotify */}
//         <div className="md:w-1/2 w-full relative overflow-hidden rounded-2xl border border-[#8245ec]/30 bg-white/5 backdrop-blur-sm shadow-[0_0_25px_rgba(130,69,236,0.15)] transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(130,69,236,0.25)]
// ">

//           {/* Animated gradient overlay */}
//           <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(130,69,236,0.2)_0%,rgba(59,130,246,0.2)_50%,rgba(130,69,236,0.2)_100%)] bg-[length:200%_200%] opacity-0 group-hover:opacity-100 animate-gradientSweep pointer-events-none"></div>

//           <div className="relative z-10 p-6">
//             <h2 className="text-2xl font-bold text-white mb-4">🎧 My Vibes Playlist</h2>
//             <iframe
//               style={{ borderRadius: "12px" }}
//               src="https://open.spotify.com/embed/playlist/31jLDE8PIEQYRqd68z644W?utm_source=generator"
//               width="100%"
//               height="380"
//               frameBorder="0"
//               allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
//               loading="lazy"
//             ></iframe>
//           </div>
//         </div>

//         {/* RIGHT - Gallery */}
//         <div className="md:w-1/2 w-full relative overflow-hidden rounded-2xl border border-[#3b82f6]/30 bg-white/5 backdrop-blur-sm shadow-[0_0_25px_rgba(59,130,246,0.15)] transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(130,69,236,0.25)] flex flex-col justify-center items-center text-center">

//           {/* Animated gradient overlay */}
//           <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(59,130,246,0.2)_0%,rgba(130,69,236,0.2)_50%,rgba(59,130,246,0.2)_100%)] bg-[length:200%_200%] opacity-0 group-hover:opacity-100 animate-gradientSweep pointer-events-none"></div>

//           <div className="relative z-10 p-6">
//             <h2 className="text-2xl font-bold text-white mb-4">📸 My Gallery</h2>
//             <p className="text-gray-300 mb-8 text-sm sm:text-base">
//               A creative showcase section where I’ll soon display my design work, project snaps, and favorite visuals.
//             </p>
//             <button
//               className="px-8 py-3 rounded-full text-lg font-bold text-white transition duration-300 transform hover:scale-105"
//               style={{
//                 background: 'linear-gradient(90deg, #3b82f6, #8245ec)',
//                 boxShadow: '0 0 12px #3b82f6, 0 0 24px #8245ec',
//               }}
//             >
//               COMING SOON
//             </button>
//           </div>
//         </div>

//       </div>



//     </section>
//   );
// };

// export default About;

