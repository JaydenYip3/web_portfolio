"use client";

import { useId, useState } from "react";

interface MessageComposerProps {
  email: string;
  templates: string[];
  words: string[];
}

/** Compose a message from a template and a word, like the ones left on the ground, then send it by email. */
export function MessageComposer({ email, templates, words }: MessageComposerProps) {
  const [template, setTemplate] = useState(0);
  const [word, setWord] = useState(0);
  const id = useId();

  const message = templates[template].replace("____", words[word]);
  const href = `mailto:${email}?subject=${encodeURIComponent("A message from a fellow Tarnished")}&body=${encodeURIComponent(`${message}\n\n`)}`;

  return (
    <div className="panel p-6 text-left sm:p-8">
      <h3 className="panel-heading">Leave a message</h3>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-template`} className="field-label">
            Template
          </label>
          <select
            id={`${id}-template`}
            className="field mt-2"
            value={template}
            onChange={(e) => setTemplate(Number(e.target.value))}
          >
            {templates.map((option, i) => (
              <option key={option} value={i}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor={`${id}-word`} className="field-label">
            Word
          </label>
          <select
            id={`${id}-word`}
            className="field mt-2"
            value={word}
            onChange={(e) => setWord(Number(e.target.value))}
          >
            {words.map((option, i) => (
              <option key={option} value={i}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      <p className="message-preview mt-8 text-center text-2xl text-balance sm:text-3xl" aria-live="polite">
        {message}
      </p>

      <div className="mt-8 flex justify-center">
        <a href={href} className="btn btn-primary">
          Send message
        </a>
      </div>
    </div>
  );
}
