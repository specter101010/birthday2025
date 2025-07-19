import { useEffect, useState, useRef } from "react";
import { TypingText } from "../../components/animate-ui/text/typing";
import { RippleButton } from "../../components/animate-ui/buttons/ripple";
import {
  Smile,
  Frown,
  Laugh,
  Sparkles,
  User,
  AlertCircle,
  HelpCircle,
  ThumbsUp,
  Brain,
  Heart,
  Gift,
  PartyPopper,
  ArrowBigRight
} from "lucide-react";
import './home.css'
import { useNavigate } from "react-router-dom";


const strokeColor = "#c026d3";

const conversationFlow = {
  start: { text: "Hai Nanda,        xixixixi kena skema lagi nihh", next: "q1", gif: "/gif/nyapa.gif" },
  q1: {
    text: "Lagi ngapain?        Sibuk nggak?",
    choices: [
      {
        label: (
          <span className="flex items-center gap-2">
            <Frown stroke={strokeColor} className="w-5 h-5" /> Lagi sibuk
          </span>
        ),
        next: "sibuk",
      },
      {
        label: (
          <span className="flex items-center gap-2">
            <Smile stroke={strokeColor} className="w-5 h-5" /> Enggak kok
          </span>
        ),
        next: "luang",
      },
    ],
    gif: "/gif/mikir.gif",
  },
  sibuk: { text: "Maaf ya ganggu waktunya", next: "q2", gif: "/gif/sorry.gif" },
  luang: {
    text: "Makasih ya udah ngeluangin waktu buat hal ini",
    next: "q2",
    gif: "/gif/surprise.gif",
  },
  q2: {
    text: "Sebenernya sampai sekarang tuh aku masih nggak nyangka bisa deket sama Nanda      xixixi~",
    choices: [
      {
        label: (
          <span className="flex items-center gap-2">
            <Heart stroke={strokeColor} className="w-5 h-5" /> Iyaa nihh
          </span>
        ),
        next: "q2next",
      },
      {
        label: (
          <span className="flex items-center gap-2">
            <Laugh stroke={strokeColor} className="w-5 h-5" /> Ehehehe
          </span>
        ),
        next: "q2next",
      },
    ],
    gif: "/gif/malu.gif",
  },
  q2next: {
    text: "Makasih ya udah kenal.       Jujur waktu itu aku gambling sih...        Tapi kalau kamu ga terima, mungkin kita nggak bakal sedeket ini       eheheh~",
    next: "q3",
    gif: "/gif/ngelus.gif",
  },
  q3: {
    text: "Eh tapi...        ini sebenernya alay ga sih?",
    choices: [
      {
        label: (
          <span className="flex items-center gap-2">
            <AlertCircle stroke={strokeColor} className="w-5 h-5" /> Iyaa alay
          </span>
        ),
        next: "alay",
      },
      {
        label: (
          <span className="flex items-center gap-2">
            <Smile stroke={strokeColor} className="w-5 h-5" /> Nggak kok
          </span>
        ),
        next: "nggak_alay",
      },
    ],
    gif: "/gif/bingung.gif",
  },
  alay: { text: "Aduhh maaf yaa...        kirain lucu buat ginian      ehehehe", next: "q4", gif: "/gif/ketawa.gif" },
  nggak_alay: {
    text: "Bener ya? Hufftt...      berarti nggak sia-sia mikirin konsep ini di sepertiga malam",
    next: "q4",
    gif: "/gif/lega.gif",
  },
  q4: { text: "Ehh maaf yaa...        aku cuma bisa kasih ini", next: "q4b", gif: "/gif/sedih.gif" },
  q4b: { text: "Tapi aku ada kejutan kok~        walaupun virtual xixixi", next: "q5", gif: "/gif/surprise.gif" },
  q5: {
    text: "Jawab dulu ya...                   orang-orang apa yang lucu?",
    choices: [
      {
        label: (
          <span className="flex items-center gap-2">
            <User stroke={strokeColor} className="w-5 h-5" /> Orang aring
          </span>
        ),
        next: "q5wrong",
      },
      {
        label: (
          <span className="flex items-center gap-2">
            <User stroke={strokeColor} className="w-5 h-5" /> Pak Supardi
          </span>
        ),
        next: "q5wrong",
      },
    ],
    gif: "/gif/nanya.gif",
  },
  q5wrong: {
    text: "Salah!!        xixixi~      Jawabannya adalah...          orang *kamuuuuu*",
    next: "q6",
    gif: "/gif/nunjuk.gif",
  },
  q6: { text: "Pertanyaan selanjutnya nih ehehe...", next: "q6b", gif: "/gif/mikir.gif" },
  q6b: {
    text: "Siapa penemu teori gravitasi?",
    choices: [
      {
        label: (
          <span className="flex items-center gap-2">
            <Brain stroke={strokeColor} className="w-5 h-5" /> Isaac Newton
          </span>
        ),
        next: "benar",
      },
      {
        label: (
          <span className="flex items-center gap-2">
            <HelpCircle stroke={strokeColor} className="w-5 h-5" /> Vladimir Putin
          </span>
        ),
        next: "salah",
      },
    ],
    gif: "/gif/bingung.gif",
  },
  benar: {
    text: "Wihhh benerrr!     Udah cantik,    pinter pula!",
    next: "q7",
    gif: "/gif/keren.gif",
  },
  salah: {
    text: "Gimana sihh...      cantik-cantik gini pelupa",
    next: "q7",
    gif: "/gif/lupa.gif",
  },
  q7: { text: "Pertanyaan terakhir nihhh...", next: "q7b", gif: "/gif/guling.gif" },
  q7b: {
    text: "Jujur...    Am I handsome??",
    choices: [
      {
        label: (
          <span className="flex items-center gap-2">
            <ThumbsUp stroke={strokeColor} className="w-5 h-5" /> You look so good!
          </span>
        ),
        next: "final",
      },
      {
        label: (
          <span className="flex items-center gap-2">
            <Sparkles stroke={strokeColor} className="w-5 h-5" /> dangerously good-looking
          </span>
        ),
        next: "final",
      },
    ],
    gif: "/gif/ngelus.gif",
  },
  final: {
    text: "Yang bener atuhhh~         xixixi          Makasihhhh",
    next: "hadiah",
    gif: "/gif/cinta.gif",
  },
  hadiah: {
    text: "Keren nih udah jawab semua pertanyaannya!      nanti klik langsung love di gif nya         Nihhh hadiahnya",
    end: true,
    gif: "/gif/confetti.gif",
    icon: (
      <span className="inline-flex items-center gap-2">
        <Sparkles stroke={strokeColor} className="w-5 h-5 inline-block" />
        Hadiah
      </span>
    ),
  },
};


function Home() {
const navigate = useNavigate();

  const [currentKey, setCurrentKey] = useState("start");
  const [showButtons, setShowButtons] = useState(false);
  const [clicked, setClicked] = useState(false);

  const currentNode = conversationFlow[currentKey];

  useEffect(() => {
    setShowButtons(false);
    const timer = setTimeout(() => setShowButtons(true), 3000);
    return () => clearTimeout(timer);
  }, [currentKey]);

  const handleNext = () => {
    setClicked(true);
    setTimeout(() => {
      setClicked(false);
      setCurrentKey(currentNode.next);
    }, 300); // animasi dulu baru pindah
  };

  const handleChoice = (nextKey) => {
    setClicked(true);
    setTimeout(() => {
      setClicked(false);
      setCurrentKey(nextKey);
    }, 300);
  };

  const audioRef = useRef(null);

useEffect(() => {
  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(() => {}); // handle autoplay blocking
    }
  };

  // Coba mainkan setelah interaksi (jaga-jaga jika autoplay diblok browser)
  document.addEventListener("click", playAudio, { once: true });

  return () => {
    document.removeEventListener("click", playAudio);
  };
}, []);


  const buttonAnim = `transition-all duration-500 ease-out transform ${
    clicked ? "scale-90" : "scale-100"
  } opacity-0 translate-y-4 ${showButtons ? "opacity-100 translate-y-0" : ""}`;

  return (
    <div className="min-h-screen flex flex-col items-center bg-pink-200 px-6 text-center border-2 rounded-lg border-pink-400">

    <div className="background_home">
        {/* <img className=""  src="/background/love.gif" alt="" /> */}
    </div>

      <img
        className="w-48 mt-20 mb-4 "
        src={currentNode.gif || "/gif/mikir.gif"}
        alt="GIF"
      />

      <TypingText
        key={currentKey}
        text={currentNode.text}
        duration={80}
        delay={100}
        cursor={true}
        className="text-lg sm:text-xl font-semibold text-pink-400 min-h-[60px]"
      />

      {/* Tombol Lanjut */}
      {currentNode.next && (
        <div className={`mt-8 ${buttonAnim}`}>
          <RippleButton
            onClick={handleNext}
            className="px-6 py-3 rounded-xl bg-pink-400 text-white font-semibold shadow-md active:scale-95 transition-all duration-150"
          >
             <ArrowBigRight stroke={strokeColor} className="w-5 h-5" /> Lanjut
          </RippleButton>
        </div>
      )}

      {/* Tombol Pilihan */}
      {currentNode.choices && (
        <div className={`mt-8 ${buttonAnim}`}>
          <div className="flex flex-col gap-4">
            {currentNode.choices.map((choice, idx) => (
              <RippleButton
                key={idx}
                onClick={() => handleChoice(choice.next)}
                className="px-6 py-3 rounded-full bg-pink-400 text-white font-semibold shadow-md active:scale-95 transition-all duration-150"
              >
                {choice.label}
              </RippleButton>
            ))}
          </div>
        </div>
      )}

      {/* Tombol Hadiah */}
      {currentNode.end && (
        <div className={`mt-8 ${buttonAnim}`}>
          <RippleButton
            className="px-6 py-3 rounded-full bg-yellow-400 text-black font-semibold shadow-md active:scale-95 transition-all duration-150 animate-pulse"
            onClick={() => navigate("/hadiah")}
          >
            <Gift stroke={strokeColor} className="w-5 h-5" /> Lihat Hadiahnya!
          </RippleButton>
        </div>
      )}


        <audio
        ref={audioRef}
        src="/sounds/backsound_home.mp3"
        loop
        preload="auto"
        />

    </div>
  );
}

export default Home;
