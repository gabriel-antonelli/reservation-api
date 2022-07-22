import { RandomStringGenerator } from '@/core/use-case/ports';
import { nanoid } from 'nanoid';

export class NanoIdStringGenerator implements RandomStringGenerator {
	generate(): string {
		return nanoid();
	}
}
