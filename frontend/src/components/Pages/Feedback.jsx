import React from 'react'
import { useState } from 'react';

export default function feedback() {
    const [feedback, setFeedback] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Submitting feedback: ${feedback}`);
    // Code to submit feedback goes here
  }
  return (
    <div>
      <h1>Feedback Form</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="feedback">Please enter your feedback:</label>
        <br />
        <textarea id="feedback" value={feedback} onChange={(event) => setFeedback(event.target.value)} />
        <br />
        <button type="submit">Submit Feedback</button>
      </form>
    </div>
  )
}
