// Your script here.
const synth = window.speechSynthesis;

const textInput = document.querySelector("textarea");
const voiceSelect = document.querySelector("select");
const speakBtn = document.getElementById("speak");
const stopBtn = document.getElementById("stop");
const rateSlider = document.querySelector('input[name="rate"]');
const pitchSlider = document.querySelector('input[name="pitch"]');

let voices = [];
let utterance = null;

function loadVoices() {
  voices = synth.getVoices();
  voiceSelect.innerHTML = "";

  if (voices.length === 0) {
    const opt = document.createElement("option");
    opt.textContent = "No voices available";
    voiceSelect.appendChild(opt);
    return;
  }

  voices.forEach((v, i) => {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = v.name;
    voiceSelect.appendChild(option);
  });
}

function speakText() {
  const text = textInput.value.trim();
  if (!text) return;

  synth.cancel();

  utterance = new SpeechSynthesisUtterance(text);

  const selectedVoice = voices[voiceSelect.value];
  if (selectedVoice) utterance.voice = selectedVoice;

  utterance.rate = parseFloat(rateSlider.value);
  utterance.pitch = parseFloat(pitchSlider.value);

  synth.speak(utterance);
}

function stopSpeech() {
  synth.cancel();
}

speakBtn.addEventListener("click", speakText);
stopBtn.addEventListener("click", stopSpeech);
voiceSelect.addEventListener("change", speakText);

rateSlider.addEventListener("input", () => {
  if (utterance) utterance.rate = parseFloat(rateSlider.value);
});

pitchSlider.addEventListener("input", () => {
  if (utterance) utterance.pitch = parseFloat(pitchSlider.value);
});

loadVoices();
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = loadVoices;
}
