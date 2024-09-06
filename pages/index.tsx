import { useState, useEffect } from "react";
import Head from "next/head";
import styles from "@/styles/Home.module.scss";
import Header from "@/components/Organisms/Header/Header";
import WindowBox from "@/components/Organisms/WindowBox/WindowBox";
import InputLabel from "@/components/Molecules/InputLabel/InputLabel";
import Button from "@/components/Atoms/Button/Button";
import SelectOptions from "@/components/Organisms/SelectOptions/SelectOptions";
import { arrayInputLabel, objSelectGenre, objSelectLanguage } from "@/data/data";
import Loader from "@/components/Molecules/Loader/Loader";
import Switch from "@/components/Molecules/Switch/Switch";

export default function Home() {
  const [formData, setFormData] = useState({
    protagonist: '',
    antagonist: '',
    genre: '',
    language: ''
  })
  const [error, setError] = useState(false)
  const [load, setLoad] = useState(true)
  const [story, setStory] = useState('')
  const [loaderGen, setLoaderGen] = useState(false)
  const [switchOn, setSwitchOn] = useState(false)
  const [reading, setReading] = useState(true)
  const [pause, setPause] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [textGen, setTextGen] = useState(false)
  const [questionsString, setQuestionsString] = useState<string[]>([])
  const [answersString, setAnswersString] = useState<string[]>([])

  useEffect(() => {
    const timeCloseError = setTimeout(() => {
      setErrorMessage('')
    }, 4000)
    return () => clearTimeout(timeCloseError)
  }, [errorMessage])

  useEffect(() => {
    const timeCloseError = setTimeout(() => {
      setTextGen(false)
    }, 4000)
    return () => clearTimeout(timeCloseError)
  }, [textGen])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  }

  async function setAI(prompt: string) {
    setStory('');
    setQuestionsString([])
    setAnswersString([])
    setLoaderGen(true);
    setErrorMessage(''); 
    try {
      const response = await fetch(`api/generate`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({prompt})
      })
      const data = await response.json()
      const output = data.output
      if (output) {
        setStory(output)
      }
      if (response.status === 500) {
        throw new Error(data.message)
      }
    } catch(e: unknown) {
      if (e instanceof Error) {
        setErrorMessage(e.message);
      }
    } finally {
      setLoaderGen(false);
    }
  }

  async function answers(prompt: string) {
    const response = await fetch(`api/generate`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({prompt})
    })
    const data = await response.json()
    const output = data.output
    if (output) {
      const parsedQuestionsAnswers = parseQuestionsAndAnswers(output);
      setAnswersString(parsedQuestionsAnswers);
    }
  }

  async function questions(prompt: string) {
    setQuestionsString([])
    setAnswersString([])
    const response = await fetch(`api/generate`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({prompt})
    })
    const data = await response.json()
    const output = data.output
    if (output) {
      const parsedQuestionsAnswers = parseQuestionsAndAnswers(output);
      setQuestionsString(parsedQuestionsAnswers);
    }
  }

  useEffect(() => {
    console.log(questionsString)
  }, [questionsString])

  function parseQuestionsAndAnswers(input: string): string[] {
    const cleanedInput = input.replace(/[#*\n]/g, '');
    const sections = cleanedInput.split(/\d+\.\s+/).filter(Boolean);
    return sections;
  }

  function handleGenerateQuestions() {
    const prompt = story + `Questa è la storia, genera una comprensione del testo facendo una lista di cinque domande. ${formData.language} in questa lingua.`
    questions(prompt)
  }

  function handleGenerateAnswers() {
    const prompt = story + questionsString + `Rispondi alle domande. ${formData.language} in questa lingua.`
    answers(prompt)
  }

  function handleGenerate() {
    const prompt = `Generate a ${formData.genre} story for ${switchOn ? 'adults' : 'children'}, with ${formData.protagonist} as the protagonist and ${formData.antagonist} as the antagonist, in ${formData.language}. Do not generate a title.`
    setAI(prompt)
    handleStopVoice()
  }

  useEffect(() => {
    if (errorMessage === '' && story !== '') {
      setTextGen(true)
    }
  }, [story])

  useEffect(() => {
    setTimeout(() => {
      setLoad(false)
    }, 2500)
  }, [])

  useEffect(() => {
    if ((!/^[a-zA-Z\s]+$/.test(formData.antagonist) && formData.antagonist !== '') || (!/^[a-zA-Z\s]+$/.test(formData.protagonist) && formData.protagonist !== '')) {
      setError(true)
    } else {
      setError(false)
    }
  }, [formData])

  function handleVoice() {
    const splitString = story.split('.')
    for(let i = 0; i < splitString.length; i++) {
      const utterance = new SpeechSynthesisUtterance(splitString[i])
      if (formData.language === 'italian') {
        utterance.lang = 'it-IT';
      } else if (formData.language === 'english') {
        utterance.lang = 'en-EN';
      } else if (formData.language === 'french') {
        utterance.lang = 'fr-FR';
      } else if (formData.language === 'spanish') {
        utterance.lang = 'es-ES';
      } else if (formData.language === 'german') {
        utterance.lang = 'de-DE';
      }
      if (i === splitString.length - 1) {
        utterance.onend = function() {
          setReading(true);
        }
      }
      speechSynthesis.speak(utterance)
    }
    setReading(false)
  }

  function handlePauseVoice() {
    speechSynthesis.pause()
    setPause(false)
  }

  function handleResumeVoice() {
    speechSynthesis.resume()
    setPause(true)
  }

  function handleStopVoice() {
    speechSynthesis.cancel()
    setPause(true)
    setReading(true)
  }

  function handleCloseError() {
    setErrorMessage('')
  }

  function handleCloseTextGen() {
    setTextGen(false)
  }

  return (
    <>
      <Head>
        <title>ai Story Teller</title>
        <meta name="description" content="Story generator" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        {errorMessage !== '' && <div className={styles.error}><div onClick={handleCloseError} className={styles.close}>x</div>{errorMessage}<div className={styles.bar}></div></div>}
        {textGen && <div className={styles.textGen}><div onClick={handleCloseTextGen} className={styles.close}>x</div>Successfully generated story!<div className={styles.bar}></div></div>}
        <Header title="ai Story Teller" />
        <WindowBox loader={load} display={error} title="Story Params">
          {arrayInputLabel.map(element => (<InputLabel key={element.input.id} input={element.input} label={element.label} onChange={handleChange}/>))}
          <SelectOptions name="genre" id="genre" label={objSelectGenre.label} options={objSelectGenre.options} onChange={handleChange} />
          <SelectOptions name="language" id="language" label={objSelectLanguage.label} options={objSelectLanguage.options} onChange={handleChange} />
          <Switch switch={switchOn} setSwitch={setSwitchOn}/>
          <Button onClick={handleGenerate} disabled={!(formData.protagonist.trim().length > 0 && /^[a-zA-Z\s]+$/.test(formData.protagonist)) || !(formData.antagonist.trim().length > 0 && /^[a-zA-Z\s]+$/.test(formData.antagonist)) || formData.genre === '' || formData.language === '' || loaderGen} title="Generate" />
        </WindowBox>
        {story !== '' ? 
          <div className={styles.story}>
            <div className={styles.containerButtons}>
              <Button disabled={!reading} onClick={handleVoice}><img src="/img/volume_3917598.png" alt="Icon voice" /></Button>
              {pause && <Button disabled={reading} onClick={handlePauseVoice}><img src="/img/pause_3917619.png" alt="Icon voice" /></Button>}
              {!pause && <Button disabled={reading} onClick={handleResumeVoice}><img src="/img/play_16861411.png" alt="Icon voice" /></Button>}
              <Button disabled={reading} onClick={handleStopVoice}><img src="/img/cross_3917759.png" alt="Icon voice" /></Button>
            </div>
            {story}
            <div className={styles.containerQuestionsAnswers}>
              <Button onClick={handleGenerateQuestions} title="Generates questions" />
            </div>
            <div>
              {Array.isArray(questionsString) && questionsString.length > 0 && (
              <>
                <h2>{questionsString[0]}</h2>
                <ul>
                  {questionsString.slice(1).map((element, index) => (<li key={index}>{element}</li>))}
                </ul>
              </>)}
            </div>
            {questionsString.length > 0 && 
            <div className={styles.containerQuestionsAnswers}>
              <Button onClick={handleGenerateAnswers} title="Generates answers" />
            </div>}
            <div>
              {Array.isArray(answersString) && answersString.length > 0 && (
              <>
                <h2>{answersString[0]}</h2>
                <ul>
                  {answersString.slice(1).map((element, index) => (<li key={index}>{element}</li>))}
                </ul>
              </>)}
            </div>
          </div> : 
          <div className={styles.loadStory}>
            <Loader loader={loaderGen}>
              <div className={styles.textLoad}>
                <div className={styles.loading}></div>
              </div>
            </Loader>
          </div>
        }
      </main>
    </>
  )
}
