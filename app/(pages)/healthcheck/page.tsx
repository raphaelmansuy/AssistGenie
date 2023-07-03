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
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <h1 className="text-3xl font-bold mb-6">Environment Variables</h1>
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
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
