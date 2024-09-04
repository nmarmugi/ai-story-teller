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

  useEffect(() => {
    console.log(formData)
  }, [formData])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  }

  async function setAI(prompt: string) {
    setStory('');
    setLoaderGen(true);
    const response = await fetch('https://ai-story-teller-eta.vercel.app/api/generate', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({prompt})
    })
    const data = await response.json()
    const output = data.output
    if (output) {
      setStory(output)
    }
    setLoaderGen(false);
  }

  function handleGenerate() {
    const prompt = `Generate a ${formData.genre} story for ${switchOn ? 'adults' : 'children'}, with ${formData.protagonist} as the protagonist and ${formData.antagonist} as the antagonist, in ${formData.language}.`
    setAI(prompt)
  }

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

  return (
    <>
      <Head>
        <title>ai Story Teller</title>
        <meta name="description" content="Story generator" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Header title="ai Story Teller" />
        <WindowBox loader={load} display={error} title="Story Params">
          {arrayInputLabel.map(element => (<InputLabel key={element.input.id} input={element.input} label={element.label} onChange={handleChange}/>))}
          <SelectOptions name="genre" id="genre" label={objSelectGenre.label} options={objSelectGenre.options} onChange={handleChange} />
          <SelectOptions name="language" id="language" label={objSelectLanguage.label} options={objSelectLanguage.options} onChange={handleChange} />
          <Switch switch={switchOn} setSwitch={setSwitchOn}/>
          <Button onClick={handleGenerate} disabled={!(formData.protagonist.trim().length > 0 && /^[a-zA-Z\s]+$/.test(formData.protagonist)) || !(formData.antagonist.trim().length > 0 && /^[a-zA-Z\s]+$/.test(formData.antagonist)) || formData.genre === '' || formData.language === '' || loaderGen} title="Generate" />
        </WindowBox>
        {story !== '' ? 
          <div className={styles.story}>{story}</div> : 
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
