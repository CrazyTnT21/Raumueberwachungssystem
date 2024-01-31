import {openPromisified, PromisifiedBus} from "i2c-bus";
import {sleep} from "./helper";

const START_CONVERSION = 0b1000000000000000
const MUX = new Map<string, number>([
    ["0+1", 0b0000000000000000],
    ["0+3", 0b0001000000000000],
    ["1+3", 0b0010000000000000],
    ["2+3", 0b0011000000000000],
    ["0+GND", 0b0100000000000000],
    ["1+GND", 0b0101000000000000],
    ["2+GND", 0b0110000000000000],
    ["3+GND", 0b0111000000000000]]
)
const gains = new Map<string, number>([
        [(2/3).toString(), 0b0000000000000000],// +/- 6.144V
        ["1", 0b0000001000000000], // +/- 4.096V
        ["2", 0b0000010000000000],// +/- 2.048V
        ["4", 0b0000011000000000], // +/- 1.024V
        ["8", 0b0000100000000000],// +/- 0.512V
        ["16", 0b0000101000000000],// +/- 0.256V
    ]
);

export class ads1115
{
    private _gain = gains.get("2/3")!

    get gain()
    {
        return this._gain;
    }

    set gain(level: number)
    {
        if (!gains.has(level.toString()))
        {
            const keys: string[] = [];
            for (const x of gains.keys())
            {
                keys.push(x);
            }
            throw new Error(`invalid level of '${level}'. valid values are: ${keys.join(", ")}`)
        }

        this._gain = gains.get(level.toString())!
    }

    private writeReg16(register: number, value: number)
    {
        const buff = Buffer.from([register & 3, value >> 8, value & 0xFF])
        return this.bus.i2cWrite(this.addr, 3, buff)
    }

    private async readReg16(register: number)
    {
        await this.bus.i2cWrite(this.addr, 1, Buffer.alloc(1, register))
        const buff = (await this.bus.i2cRead(this.addr, 2, Buffer.allocUnsafe(2))).buffer
        return (buff[0] << 8) | buff[1]
    }

    private async readResults()
    {
        return (await this.readReg16(0x00)) >> this.shift
    }

    private writeConfig(value: number)
    {
        return this.writeReg16(0b01, value)
    }

    async measure(mux: string)
    {
        if (!MUX.has(mux))
        {
            const keys: string[] = [];
            for (const x of MUX.keys())
            {
                keys.push(x);
            }
            throw new Error(`invalid mux of '${mux}'. valid values are: ${keys.join(", ")}`)
        }

        const config = 0x0183 // No comparator | 1600 samples per second | single-shot mode
        await this.writeConfig(config | this._gain | MUX.get(mux)! | START_CONVERSION)
        await sleep(this.delay)
        return this.readResults();
    }

    open(busNum: number)
    {
        return openPromisified(busNum);
    }

    constructor(private bus: PromisifiedBus, private addr: number = 0x48, private delay: number = 10, private shift: number = 0)
    {
    }
}