# Ask Kunwar — provider and privacy notes

Ask Kunwar retrieves current site/platform passages and answers with citations. Its local knowledge and extractive fallback do not require a paid AI provider.

## Hugging Face inference is opt-in

- External inference is **off by default**. The server calls Hugging Face only when `HUGGINGFACE_INFERENCE_ENABLED=true`, the existing server-only `HUGGINGFACE_API_KEY` is present, and relevant sources were retrieved.
- Do not request or configure a replacement key for this work. Never put the existing key in browser code, logs, responses, tests, or Git.
- Setting the flag is an explicit operator choice to send the question and bounded retrieved-source context to the provider. Hugging Face usage may consume free credits or incur provider charges; do not enable it without authorization for that usage.
- When disabled, unconfigured, unavailable, timed out, or returning no valid citation, the endpoint uses the local grounded fallback. Invalid/fabricated citation markers are removed; an answer without a valid source is refused.
- The configured provider/model is the Hugging Face Inference Providers chat-completions endpoint and Mistral 7B. No live provider response has been verified in this environment, so provider availability is not claimed.

Example server environment setting (not a secret):

```dotenv
HUGGINGFACE_INFERENCE_ENABLED=false
```

Keep `HUGGINGFACE_API_KEY` only in the deployment's server-side secret settings. The app must continue to work when it is absent.

## Request protections

The API accepts questions between 3 and 300 characters, applies persistent limits of 5 requests/minute and 30/hour per HMAC-derived client subject, and fails closed if its authentication secret is missing. Raw client IPs are not stored in the rate-limit key. Questions/provider responses are not written to application logs.

The interface reports the method returned for each answer; it does not label local fallback answers as Hugging Face output. Model-generated Markdown links are restricted to the canonical site host.
