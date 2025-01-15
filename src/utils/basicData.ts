export class BasicData {
    static cpfGenerate(): string {
      const rnd = (n: number) => Math.round(Math.random() * n);
      const mod = (base: number, div: number) => Math.round(base - Math.floor(base / div) * div);
      const n = Array(9)
        .fill('')
        .map(() => rnd(9));
  
      let d1: number = n.reduce((total, number, index) => total + number * (10 - index), 0);
      d1 = 11 - mod(d1, 11);
      if (d1 >= 10) d1 = 0;
  
      let d2: number = d1 * 2 + n.reduce((total, number, index) => total + number * (11 - index), 0);
      d2 = 11 - mod(d2, 11);
      if (d2 >= 10) d2 = 0;
  
      return `${n.join('')}${d1}${d2}`;
    }
  
    static phoneGenerator(): string {
      let number = Math.floor(Math.random() * 100000000);
      let result = '719'.concat(number.toString()).padEnd(11, '5');
      return result;
    }
  
    static evenCPF(): string {
      let randomCpf = parseInt(BasicData.cpfGenerate());
      while (randomCpf % 2 !== 0 || randomCpf.toString().length !== 11) {
        randomCpf = parseInt(BasicData.cpfGenerate());
      }
      return randomCpf.toString();
    }
  
    static generateRandomNumber(length: number) {
      const randomDigits = Array.from({ length }, () => Math.floor(Math.random() * 10)).join('');
      return randomDigits;
    }
  }
  