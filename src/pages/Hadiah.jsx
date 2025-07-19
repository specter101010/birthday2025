import { useEffect, useRef, useState } from "react";
import {
  Heart,
  Smile,
  Sparkles,
  Landmark,
  ScrollText,
  TreeDeciduous,
  Baby,
  GraduationCap,
  BriefcaseBusiness,
  HandCoins,
  Handshake,
  Timer,
} from "lucide-react";
import Confetti from "react-confetti";
import Countdown from "react-countdown";

import { MotionEffect } from "../components/animate-ui/effects/motion-effect";
import { TypingText } from "../components/animate-ui/text/typing";
const strokeColor = "#c026d3";

function Hadiah() {
    const lofiRef = useRef(null);    // untuk lagu awal (lofi)
    const audioRef = useRef(null);   // untuk lagu utama (yang dikontrol)
    
  const [currentSection, setCurrentSection] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [introCountdown, setIntroCountdown] = useState(15);

  useEffect(() => {
    const prepareAudioOnClick = () => {
      // Persiapkan lofi
      if (lofiRef.current) {
        lofiRef.current.play().catch(() => {});
      }
  
      // Persiapkan main audio (harus di-trigger dulu biar bisa autoplay nanti)
      if (audioRef.current) {
        audioRef.current.play().then(() => {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }).catch(() => {});
      }
    };
  
    // Trigger on first user interaction (iOS Safari friendly)
    document.addEventListener("click", prepareAudioOnClick, { once: true });
  
    const countdownInterval = setInterval(() => {
      setIntroCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          setShowIntro(false);
          setShowContent(true);
  
          // Stop lofi
          if (lofiRef.current) {
            lofiRef.current.pause();
            lofiRef.current.currentTime = 0;
          }
  
          // Play main music (sudah dapat izin dari klik awal)
          if (audioRef.current) {
            audioRef.current.play().catch(() => {});
          }
        }
  
        return prev - 1;
      });
    }, 1000);
  
    return () => {
      clearInterval(countdownInterval);
      document.removeEventListener("click", prepareAudioOnClick);
    };
  }, []);
  

const [isPlaying, setIsPlaying] = useState(true);


const toggleAudio = () => {
  const audio = audioRef.current;
  if (audio) {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
  }
};


  
  


  const renderer = ({ days, hours, minutes, seconds }) => {
    return (
      <div className="text-pink-600 text-xl font-mono mt-4 animate-pulse">
        {days} hari, {hours} jam, {minutes} menit, {seconds} detik
      </div>
    );
  };


  const [visibleImageCount, setVisibleImageCount] = useState(0);

  useEffect(() => {
    if (showContent && currentSection === 0 && visibleImageCount < 6) {
      const timer = setTimeout(() => {
        setVisibleImageCount((prev) => prev + 1);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [visibleImageCount, currentSection, showContent]);

  const goals = [
    {
      icon: <GraduationCap stroke="#db2777" className="w-8 h-8" />,
      title: "Graduate with honors",
      detail: "Finish college with cum laude and be proud of every step taken.",
    },
    {
      icon: <BriefcaseBusiness stroke="#db2777" className="w-8 h-8" />,
      title: "Cool Career",
      detail: "Find a job that aligns with passion and gives freedom to grow.",
    },
    {
      icon: <HandCoins stroke="#db2777" className="w-8 h-8" />,
      title: "Financial Freedom",
      detail: "Earn well, save smart, and enjoy life without worry.",
    },
    {
      icon: <Handshake stroke="#db2777" className="w-8 h-8" />,
      title: "Married by 27–28",
      detail: "Build a relationship rooted in love and trust, heading to marriage.",
    },
    {
      icon: <Baby stroke="#db2777" className="w-8 h-8" />,
      title: "Two Cute Kids",
      detail: "Raise children with kindness, laughter, and love.",
    },
    {
      icon: <TreeDeciduous stroke="#db2777" className="w-8 h-8" />,
      title: "Grow Old Together",
      detail: "Live long, love deep, and grow wiser side by side.",
    },
  ];
  const [selected, setSelected] = useState(null);
  
  
  const sections = [
    {
      title: "Our Little Memories",
      content: (
        <>
     

          <p className="text-pink-700 text-base sm:text-lg mb-6 text-center">
          <TypingText
                text='They may be little moments, but they live forever in my heart. From late-night talks to silly laughs—we made magic in the smallest ways'
                duration={40}
                delay={0}
                cursor={true}
            />
          
          </p>
       
  
          <div className="grid grid-cols-1 gap-6 place-items-center">
            {[
              {
                src: "/images/memory1.png",
                caption: "foto pas nandaa magang pertama kali xixixi",
              },
              {
                src: "/images/memory2.png",
                caption: "Kalo ini foto pertama yang nanda kirim bisa di save",
              },
              {
                src: "/images/memory3.png",
                caption: "xixixi foto berdua di kopi 16, inget ga? ragu ragu buat foto karna ramai xixixi",
              },
              {
                src: "/images/memory4.png",
                caption: "ini pas di foto studioo ahahah ngantrinyaa lama bet, but fotonya baguss",
              },
              {
                src: "/images/memory5.png",
                caption: "kalo ini yaa karna cantikk ajaa eheheh, sama imutttt benerrrr",
              },
              {
                src: "/images/memory6.png",
                caption: "lasttt foto gabungan ehehe dibuat seolah olah lagi natap bidadari",
              },
            ]
              .slice(0, visibleImageCount)
              .map((item, index) => (
                <MotionEffect
                  key={index}
                  slide={{ direction: "up" }}
                  fade
                  zoom
                  inView
                  delay={0.1}
                  className="w-full flex justify-center"
                >
                  <div className="w-[270px] flex flex-col items-center text-center  ">
                    <img
                      src={item.src}
                      alt={`Memory ${index + 1}`}
                      className="w-full h-[240px] object-cover object-center rounded-md mb-4"
                    />
                    <p className="text-xs text-pink-600">{item.caption}</p>
                  </div>
                </MotionEffect>
              ))}
          </div>
        </>
      ),
      icon: <Landmark stroke="#db2777" className="w-8 h-8" />,
    },
  
    {
        title: "A Little Greeting Card for You",
        content: (
            <div className="bg-pink-100 border border-pink-400 rounded-xl p-6 text-left shadow-inner">
            <p className="font-handwriting text-pink-700 text-lg">
                Dear Nanda
            <br />
            <br />
            I'm truly grateful to have met someone like you. <br />
            Your presence brings light in ways words often fail to describe. <br />
            On your birthday, I just want you to remember—<br />
            you are deeply cherished, endlessly inspiring, and beautifully you.  
            <br />
            <br />
            Here's to more laughter, growth, and moments that matter.  
            <br />
            <br />
            — from someone who’s thankful to share this journey with you 💌
            </p>
            </div>
        ),
        icon: <ScrollText stroke="#db2777" className="w-8 h-8" />,
      },
    {
      title: "What We’ve Planned✨",
      content: (
        <div className="space-y-4 mt-10 mb-4">
          <div className="flex flex-col items-center">
      {/* Grid of Icon Cards */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {goals.map((goal, index) => (
          <button
            key={index}
            onClick={() => setSelected(index)}
            className={`p-4 rounded-2xl shadow-md border-2 transition-all ${
              selected === index
                ? "border-pink-600 bg-pink-50"
                : "border-gray-200 hover:border-pink-400"
            }`}
          >
            {goal.icon}
          </button>
        ))}
      </div>

      {/* Detail Section */}
      {selected !== null && (
        <div className="max-w-sm text-center p-4 rounded-xl bg-pink-50 border border-pink-200 text-pink-700 shadow-sm transition-all duration-300">
          <h3 className="font-bold text-lg mb-2">{goals[selected].title}</h3>
          <p className="text-sm">{goals[selected].detail}</p>
        </div>
      )}
    </div>
        </div>
      ),
      icon: <Sparkles stroke="#db2777" className="w-8 h-8" />,
    },
    {
        title: "A Voice Just for You",
        content: (
            <div className="w-full max-w-md mx-auto mt-10 bg-pink-100 rounded-xl shadow-xl p-6">
              <div className="flex items-center space-x-4">
                <div>
                  <img
                    src="/images/track-cover.png"
                    alt="Track Cover"
                    className="w-36 h-30 object-cover rounded shadow-md"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <h4 className="text-pink-700 text-lg font-bold">For You, My Dear 💓</h4>
                  <p className="text-gray-600 text-sm italic">I'm sorry my english so bad</p>
                </div>
              </div>
          
              <div className="mt-6">
                <audio id="voiceMessage" src="/sounds/my_voice.mp3" />
                <button
                  id="playPauseBtn"
                  onClick={() => {
                    const audio = document.getElementById("voiceMessage");
                    const btn = document.getElementById("playPauseBtn");
                    if (audio.paused) {
                      audio.play();
                      btn.innerText = "⏸️ Pause Voice Message";
                    } else {
                      audio.pause();
                      btn.innerText = "▶️ Play Voice Message";
                    }
                    audio.onended = () => {
                      btn.innerText = "▶️ Play Voice Message";
                    };
                  }}
                  className="w-full bg-pink-600 text-white font-semibold py-3 rounded-full text-base mt-2 hover:bg-pink-700 transition"
                >
                  ▶️ Play Voice Message
                </button>
              </div>
          
              <div className="mt-4 flex justify-between text-sm text-pink-500 font-mono">
                <span>💖 00:00</span>
                <span>01:23</span>
              </div>
          
              <div className="w-full bg-pink-300 rounded-full h-2 mt-1">
                <div className="bg-pink-600 h-2 rounded-full w-[40%] animate-pulse"></div>
              </div>
          
              <p className="mt-6 text-center text-gray-500 italic">
              Ucapan ini aku rekam sendiri, khusus untuk kamu. Dengarkan baik-baik ya.💌
              </p>
            </div>
          ),          
        icon: <Sparkles stroke="#db2777" className="w-8 h-8" />,
      }      
,      
    {
        title: "Your Day is Coming",
        content: (
          <>
            <p className="text-pink-700 mb-10 mt-5 text-center text-base sm:text-lg font-semibold">
            Countdown to the day my favorite soul came into this world 
            </p>
            <Countdown
              date={new Date("2025-07-22T00:00:00")}
              renderer={({ days, hours, minutes, seconds }) => (
                <div className="flex justify-center gap-2 sm:gap-3 text-center text-pink-700 font-bold text-xl sm:text-3xl mt-3 font-mono tracking-wider">
                  {[
                    { label: "Days", value: days },
                    { label: "Hours", value: hours },
                    { label: "Minutes", value: minutes },
                    { label: "Seconds", value: seconds },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="bg-pink-100 px-2 py-1 sm:px-3 sm:py-2 rounded-lg shadow"
                    >
                      <div className="text-3xl sm:text-4xl">
                        {String(item.value).padStart(2, "0")}
                      </div>
                      <div className="text-[10px] sm:text-xs uppercase mt-1 tracking-tight">
                        {item.label}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            />
            <img
              src="/gif/default.gif"
              alt="Birthday Cake"
              className="w-24 h-24 mt-5 mx-auto"
            />
          </>
        ),
        icon: <Timer stroke="#db2777" className="w-8 h-8" />,
      }
      
  ];

  const handleNext = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-pink-200 px-6 text-center overflow-hidden relative py-10 border-2 rounded-lg border-pink-400">
 

      {/* Intro */}
      {showIntro && (
        <div className="flex flex-col items-center text-center mt-10 animate-fade-in transition-all duration-700">

<Confetti width={window.innerWidth} height={window.innerHeight} />

            <img
            src="/gif/confetti.gif"
            alt="confetti"
            className="w-40 h-auto mb-4 drop-shadow-lg"
            />
          <h1 className="text-3xl sm:text-4xl font-bold text-pink-600 mb-2 flex items-center gap-2 animate-pulse mb-20">
            🎉 Happy Birthday in Advance!
            </h1>

            <p className="text-lg sm:text-xl text-pink-700 max-w-md mb-50">
            <TypingText
                text=' Selamat ulang tahunnnn yaa             ~ eh iya masih 2 hari lagi xixixi,           tapi gpp, lebih cepat lebih bagus kannn  '
                duration={80}
                delay={100}
                cursor={true}
                className="text-lg sm:text-xl font-semibold text-pink-400 min-h-[60px]"
            />

           
            </p>
            <p className="text-5xl font-extrabold text-white/60 animate-pulse tracking-widest drop-shadow-md font-mono">
            {introCountdown}
            </p>
        </div>
        )}


      {/* Content Sections */}
      {showContent && (

    
              
        <div className=" rounded-xl w-full max-w-xl animate-fade-in transition-all duration-700">
            <MotionEffect
              key={currentSection} 
slide={{ direction: "up" }}
fade
zoom
inView
delay={0.2}
>
<div className="flex items-center justify-center mb-3">
            {sections[currentSection].icon}
          </div>
          <h2 className="text-2xl font-bold text-pink-600 mb-2">

          <MotionEffect
            slide={{ direction: "up" }}
            fade
            zoom
            inView
            delay={0.2}
            >
                  {sections[currentSection].title}
            </MotionEffect>
       
          </h2>
          <div className="text-pink-700 text-base sm:text-lg">
            {sections[currentSection].content}
          </div>

          {currentSection < sections.length - 1 && (
            (currentSection !== 0 || visibleImageCount >= 6) && (
                <button
                onClick={handleNext}
                className="mt-6 px-6 py-2 rounded-full bg-pink-500 text-white font-semibold shadow-md active:scale-95 transition-all"
                >
                ➡️ Lanjut
                </button>
            )
            )}
</MotionEffect>
  

        </div>
      )}

      {/* Backsound */}
      <div
  className="opacity-80 fixed top-4 right-4 flex items-center gap-2 px-4 py-2 bg-pink-200 border-2 border-pink-400 rounded-lg shadow-lg hover:bg-pink-300 transition-all duration-300 cursor-pointer z-50"
  onClick={toggleAudio}
>
  <div className="text-xl">
    {isPlaying ? "🎵" : "🔇"}
  </div>
  <span className="text-sm font-semibold text-pink-800 tracking-wide">
    {isPlaying ? "Music On" : "Music Off"}
  </span>
</div>


{/* Intro Sound (lofi happy birthday) */}
<audio ref={lofiRef} src="/sounds/lofi_happy_birthday.mp3" />

{/* Lagu utama (yang bisa di-toggle) */}
<audio ref={audioRef} src="/sounds/hadiah_theme.mp3" loop />



    </div>
  );
}

export default Hadiah;