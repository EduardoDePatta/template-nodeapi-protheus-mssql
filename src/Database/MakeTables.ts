import { FormatUtil } from "../helpers/FormatUtils"

export namespace MakeTables {
  export const SA1 = (code: number | string) => `SA1${FormatUtil.makeDigits(String(code))}0`
  export const SA3 = (code: number | string) => `SA3${FormatUtil.makeDigits(String(code))}0`
  export const SD2 = (code: number | string) => `SD2${FormatUtil.makeDigits(String(code))}0`
  export const SE1 = (code: number | string) => `SE1${FormatUtil.makeDigits(String(code))}0`
  export const SE5 = (code: number | string) => `SE5${FormatUtil.makeDigits(String(code))}0`
  export const SF2 = (code: number | string) => `SF2${FormatUtil.makeDigits(String(code))}0`
  export const SZV = (code: number | string) => `SZV${FormatUtil.makeDigits(String(code))}0`
  export const ZZ5 = (code: number | string) => `ZZ5${FormatUtil.makeDigits(String(code))}0`
  export const ZZH = (code: number | string) => `ZZH${FormatUtil.makeDigits(String(code))}0`
  export const ZZJ = (code: number | string) => `ZZJ${FormatUtil.makeDigits(String(code))}0`
}

export type TableKeyDynamic = {
  [K in keyof typeof MakeTables]?: number | string
}
