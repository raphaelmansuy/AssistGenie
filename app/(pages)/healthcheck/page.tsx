import { env } from '@/env.mjs'

type EnvVariable = {
  name: string
  value: string
}

export default function EnvPage() {
  const envVariables: EnvVariable[] = []

  for (const [name, value] of Object.entries(env)) {
    if (name.startsWith('AWS')) {
      continue
    }

    envVariables.push({ name, value })
  }

  return (
    <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <h1 className="mb-6 text-3xl font-bold">Environment Variables</h1>
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Value</th>
              </tr>
            </thead>
            <tbody>
              {envVariables?.map((variable) => (
                <tr key={variable.name}>
                  <td className="border px-4 py-2">{variable.name}</td>
                  <td className="border px-4 py-2">{variable.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
