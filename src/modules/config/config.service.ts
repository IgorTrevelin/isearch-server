import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';

@Injectable()
export class ConfigService {
  private data: { [k: string]: string | null };
  private envKeys: string[];

  constructor() {
    dotenv.config();
  }

  public get(key: string): string | null {
    try {
      return process.env[key];
    } catch (e) {
      return null;
    }
  }

  public getRegisteredKeys(): string[] {
    return Object.keys(this.data);
  }
}
