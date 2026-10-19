import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const settingsSchema = z.object({
  displayName: z.string().trim().min(2, 'Display name must be at least 2 characters.'),
  email: z.email('Enter a valid email address.'),
  theme: z.enum(['Light', 'Dark']),
  notifications: z.boolean(),
})

type SettingsFormValues = z.infer<typeof settingsSchema>

function SettingsForm() {
  const [submitted, setSubmitted] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      displayName: '',
      email: '',
      theme: 'Light',
      notifications: false,
    },
  })

  const onSubmit = async (values: SettingsFormValues) => {
    console.log(values)
    setSubmitted(true)
  }

  return (
    <section
      aria-labelledby="settings-title"
      className="mx-auto w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60 sm:p-10"
    >
      <header className="mb-8">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.16em] text-indigo-600">
          Preferences
        </p>
        <h1 id="settings-title" className="text-3xl font-bold tracking-tight text-slate-950">
          Settings
        </h1>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Manage your profile and notification preferences.
        </p>
      </header>

      <form
        aria-labelledby="settings-title"
        className="space-y-6"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <label htmlFor="displayName" className="mb-2 block text-sm font-medium text-slate-800">
            Display Name <span aria-hidden="true" className="text-rose-600">*</span>
          </label>
          <input
            {...register('displayName')}
            id="displayName"
            type="text"
            autoComplete="name"
            aria-required="true"
            aria-invalid={Boolean(errors.displayName)}
            aria-describedby={errors.displayName ? 'displayName-error' : 'displayName-hint'}
            className="block w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 aria-[invalid=true]:border-rose-500 aria-[invalid=true]:focus:ring-rose-100"
            placeholder="Your name"
          />
          {errors.displayName ? (
            <p id="displayName-error" className="mt-2 text-sm text-rose-700">
              {errors.displayName.message}
            </p>
          ) : (
            <p id="displayName-hint" className="mt-2 text-sm text-slate-500">
              Use at least 2 characters.
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-800">
            Email <span aria-hidden="true" className="text-rose-600">*</span>
          </label>
          <input
            {...register('email')}
            id="email"
            type="email"
            autoComplete="email"
            aria-required="true"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'email-error' : 'email-hint'}
            className="block w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 aria-[invalid=true]:border-rose-500 aria-[invalid=true]:focus:ring-rose-100"
            placeholder="you@example.com"
          />
          {errors.email ? (
            <p id="email-error" className="mt-2 text-sm text-rose-700">
              {errors.email.message}
            </p>
          ) : (
            <p id="email-hint" className="mt-2 text-sm text-slate-500">
              We’ll use this address for your account.
            </p>
          )}
        </div>

        <div>
          <label htmlFor="theme" className="mb-2 block text-sm font-medium text-slate-800">
            Theme
          </label>
          <select
            {...register('theme')}
            id="theme"
            className="block w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-slate-900 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
          >
            <option value="Light">Light</option>
            <option value="Dark">Dark</option>
          </select>
        </div>

        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <div className="flex items-start gap-3">
            <input
              {...register('notifications')}
              id="notifications"
              type="checkbox"
              aria-describedby="notifications-hint"
              className="mt-0.5 size-4 rounded border-slate-300 text-indigo-600 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            />
            <div>
              <label htmlFor="notifications" className="text-sm font-medium text-slate-800">
                Notifications
              </label>
              <p id="notifications-hint" className="mt-1 text-sm text-slate-600">
                Receive updates and important account notifications.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p aria-live="polite" role="status" className="min-h-5 text-sm text-emerald-700">
            {submitted ? 'Your settings were submitted successfully.' : ''}
          </p>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex min-h-11 items-center justify-center rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-200 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? 'Saving…' : 'Save settings'}
          </button>
        </div>
      </form>
    </section>
  )
}

export default SettingsForm
