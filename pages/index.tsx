import { useState, useEffect } from "react";
import Head from "next/head";
import styles from "@/styles/Home.module.scss";
import Header from "@/components/Organisms/Header/Header";
import WindowBox from "@/components/Organisms/WindowBox/WindowBox";
import InputLabel from "@/components/Molecules/InputLabel/InputLabel";
import Button from "@/components/Atoms/Button/Button";
import SelectOptions from "@/components/Organisms/SelectOptions/SelectOptions";
import { arrayInputLabel, objSelect } from "@/data/data";

export default function Home() {
  const [formData, setFormData] = useState({
    protagonist: '',
    antagonist: '',
    genre: ''
  })
  const [error, setError] = useState(false)
  const [load, setLoad] = useState(true)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
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
          <SelectOptions label={objSelect.label} options={objSelect.options} onChange={handleChange} />
          <Button disabled={!(formData.protagonist.trim().length > 0 && /^[a-zA-Z\s]+$/.test(formData.protagonist)) || !(formData.antagonist.trim().length > 0 && /^[a-zA-Z\s]+$/.test(formData.antagonist)) || formData.genre === ''} title="Generate" />
        </WindowBox>
      </main>
    </>
  )
}
