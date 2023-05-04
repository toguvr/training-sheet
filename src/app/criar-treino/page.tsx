/* eslint-disable react/jsx-key */
'use client';

import { FormEvent, useEffect, useState } from 'react';
import { api } from '@/services/api';

export default function Home() {
  const [values, setValues] = useState({ name: '', nameId: '' });
  const [names, setNames] = useState([]);
  async function handleTrainingName(e: FormEvent) {
    e.preventDefault();
    await api.post('/wod', { ...values, did: false });
  }
  async function getNames() {
    const res = await api.get('/training-name');

    setNames(res.data);
    setValues({ ...values, nameId: res.data[0].data.id });
  }

  useEffect(() => {
    getNames();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
        Cadastre o treino&nbsp;
      </p>
      <form className="flex flex-col" onSubmit={handleTrainingName}>
        <select
          className="m-2 p-4"
          name="nameId"
          onChange={(e) => setValues({ ...values, nameId: e.target.value })}
        >
          {names.map((name) => (
            <option key={name.ts} value={name?.data?.id}>
              {name?.data?.name}
            </option>
          ))}
        </select>
        <select
          name="weekDay"
          className="m-2 p-4"
          onChange={(e) =>
            setValues({ ...values, [e.target.name]: e.target.value })
          }
        >
          <option value={0}>Domingo</option>
          <option value={1}>Segunda</option>
          <option value={2}>Terca</option>
          <option value={3}>Quarta</option>
          <option value={4}>Quinta</option>
          <option value={5}>Sexta</option>
          <option value={6}>Sabado</option>
        </select>
        <label htmlFor="weekNumber">
          Semana
          <input
            type="text"
            className="m-2 p-4"
            name="weekNumber"
            onChange={(e) =>
              setValues({ ...values, [e.target.name]: e.target.value })
            }
          />
        </label>
        <textarea
          name="name"
          className="p-4 m-2"
          onChange={(e) =>
            setValues({ ...values, [e.target.name]: e.target.value })
          }
          cols={30}
          rows={10}
        ></textarea>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Criar
        </button>
      </form>
    </main>
  );
}
