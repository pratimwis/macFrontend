"use client";
import Header from "@/common/header";
import { checkAuth } from "@/utils/checkAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function TextToSpeech() {
  const [text, setText] = useState("");
  const [message, setMessage] = useState({ type: "", content: "" });
  const [speaking, setSpeaking] = useState(false);
  const [supported, setSupported] = useState(false);
  const router = useRouter();

  // Check if browser supports SpeechSynthesis
  useEffect(() => {
    if ("speechSynthesis" in window) {
      setSupported(true);
    }
  }, []);


  // Convert text to speech
  const handleSpeak = () => {
    if (!text.trim()) {
      setMessage({ type: "error", content: "Please enter some text." });
      return;
    }

    window.speechSynthesis.cancel(); // Cancel any current speech
    const utterance = new SpeechSynthesisUtterance(text);

    utterance.onstart = () => {
      setSpeaking(true);
      setMessage({ type: "", content: "" });
    };

    utterance.onend = () => {
      setSpeaking(false);
      setMessage({ type: "success", content: "Finished speaking." });
    };

    utterance.onerror = () => {
      setSpeaking(false);
      setMessage({ type: "error", content: "An error occurred during speech." });
    };

    window.speechSynthesis.speak(utterance);
  };

  // Stop current speech
  const handleStop = () => {
    window.speechSynthesis.cancel();
    setSpeaking(false);
    setMessage({ type: "info", content: "Speech stopped." });
  };


  return (
    <div className="relative min-h-screen  px-2 py-2 flex items-center justify-center"
      style={{
        background: 'linear-gradient(to bottom right, #EEAECA, #94BBE9)',
      }}
    >
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl md:text-4xl font-bold text-indigo-700 mb-6 text-center">
          Text to Speech Converter
        </h1>

        {!supported ? (
          <p className="text-red-600 font-semibold text-center">
            Sorry, your browser does not support Speech Synthesis.
          </p>
        ) : (
          <>
            <label htmlFor="text-input" className="block text-sm font-medium text-gray-700 mb-2">
              Enter text below:
            </label>
            <textarea
              id="text-input"
              className="w-full h-32 p-4 text-gray-800 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none mb-4 resize-none"
              placeholder="Type something here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />

            <div className="flex flex-col md:flex-row gap-4">
              <button
                onClick={handleSpeak}
                disabled={speaking}
                className={`w-full md:flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-lg transition duration-200 ${speaking ? "opacity-50 cursor-not-allowed" : ""
                  }`}
              >
                {speaking ? "Speaking..." : "Convert to Speech"}
              </button>

              {speaking && (
                <button
                  onClick={handleStop}
                  className="w-full md:flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-2.5 rounded-lg transition duration-200"
                >
                  Stop
                </button>
              )}
            </div>

            {message.content && (
              <p
                className={`mt-4 text-center font-medium ${message.type === "error"
                    ? "text-red-600"
                    : message.type === "success"
                      ? "text-green-600"
                      : "text-indigo-700"
                  }`}
              >
                {message.content}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
