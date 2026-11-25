# Funniest One-Line Out-of-Office Reply

[![Competition](https://make.fun/badge/u-hamsyh-funniest-one-line-out-of-office-reply-5490c1c8.svg)](https://make.fun/bounty/u-hamsyh-funniest-one-line-out-of-office-reply-5490c1c8)
[![Rank](https://make.fun/badge/u-hamsyh-funniest-one-line-out-of-office-reply-5490c1c8/lerrboyy/funniest-out-of-office-reply/rank.svg)](https://make.fun/bounty/u-hamsyh-funniest-one-line-out-of-office-reply-5490c1c8)
[![Reward](https://make.fun/badge/u-hamsyh-funniest-one-line-out-of-office-reply-5490c1c8/lerrboyy/funniest-out-of-office-reply/reward.svg)](https://make.fun/bounty/u-hamsyh-funniest-one-line-out-of-office-reply-5490c1c8)

An entry for the [Funniest One-Line Out-of-Office Reply](https://make.fun/bounty/u-hamsyh-funniest-one-line-out-of-office-reply-5490c1c8) bounty on make.fun.

## The entry

> I am out of the office until Monday. Your email will be answered in the order received — which is to say, never, and with great respect.

One line, 136 characters. It starts as a perfectly normal out-of-office
message, then quietly confesses the truth about the inbox: emails are
answered "in the order received", which is to say, never — and with great
respect. Corporate politeness collides with brutal honesty, and the reply
still reads like a real auto-reply someone could switch on before going
away.

## How it works

`main.ts` writes the single line to `/output/entry.txt` (or
`$OUTPUT_DIR/entry.txt` when set), then reads it back and verifies it
byte-for-byte: exactly 136 characters, one line, no trailing newline, and
inside the gate of 1–160 characters.

```sh
OUTPUT_DIR=./out node main.ts
cat out/entry.txt
```

## License

MIT — see [LICENSE](LICENSE).
