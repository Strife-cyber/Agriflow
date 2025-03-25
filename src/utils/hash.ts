type HashAlgorithm = 'SHA-256' | 'SHA-512';

interface HashOptions {
    algorithm?: HashAlgorithm;
    iterations?: number;
}

export async function hash(
    input: string,
    options: HashOptions = {}
): Promise<string> {
    const {
        algorithm = 'SHA-256',
        iterations = 3
    } = options;

    try {
        if (typeof input !== 'string' || input.length === 0) {
            throw new Error('Input must be a non-empty string');
        }
        if (iterations < 1) {
            throw new Error('Iterations must be a positive number');
        }

        let data: BufferSource = new TextEncoder().encode(input);

        for (let i = 0; i < iterations; i++) {
            data = await crypto.subtle.digest(algorithm, data);
        }

        const hashArray = Array.from(new Uint8Array(data as ArrayBuffer));
        const hashHex = hashArray
            .map((byte) => byte.toString(16).padStart(2, '0'))
            .join('');

        return hashHex;
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        throw new Error(`Hashing failed: ${errorMessage}`);
    }
}

export async function verifyHash(
    input: string,
    hashValue: string,
    options: HashOptions = {}
): Promise<boolean> {
    try {
        const newHash = await hash(input, options);
        return newHash === hashValue;
    } catch (error) {
        return false;
    }
}