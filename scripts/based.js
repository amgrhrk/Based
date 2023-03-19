const Based = {
    async encode(text) {
        const blob = new Blob([text]);
        const uint8Array = new Uint8Array(await blob.arrayBuffer());
        return [...uint8Array]
            .map(byte => byte.toString(4).padStart(4, '0'))
            .flatMap(token => [...token].map(digit => {
                switch (digit) {
                    case '0': return '典';
                    case '1': return '孝';
                    case '2': return '急';
                    case '3': return '赢';
                    default: return '?';
                }
            })).join('');
    },
    async decode(based) {
        const uint8Data = [];
        for (let i = 0; i < based.length; i += 4) {
            const base4Number = [...based.slice(i, i + 4)].map(c => {
                switch (c) {
                    case '典': return '0';
                    case '孝': return '1';
                    case '急': return '2';
                    case '赢': return '3';
                    default: throw new Error('Invalid char');
                }
            }).join('');
            uint8Data.push(parseInt(base4Number, 4));
        }
        const blob = new Blob([new Uint8Array(uint8Data)]);
        return blob.text();
    }
};
