'use client'

import { useChat } from 'ai/react'

function Message(props: { message: string; role: string }) {
  return (
    <>
      <div className="whitespace-pre-wrap text-sm">
        {props.role === 'user' ? (
          <span className="font-bold">User: </span>
        ) : (
          <span className="font-bold">AI: </span>
        )}
        {props.message}
      </div>
      <br />
    </>
  )
}

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: '/api/v1/chat',
  })

  return (
    <div className="stretch mx-auto flex w-full max-w-md flex-col py-24">
      {messages.length > 0
        ? messages.map((m) => (
            <Message key={m.id} message={m.content} role={m.role} />
          ))
        : null}

      <div className="flex justify-center bg-slate-600"></div>

      <form onSubmit={handleSubmit}>
        <input
          className="fixed bottom-0 mb-8 w-full max-w-md rounded border border-gray-300 p-2 shadow-2xl"
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
        />
      </form>
    </div>
  )
}
