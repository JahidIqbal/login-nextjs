export const calculateRatio = (localPercentage: number) => {
    if (localPercentage < 0 || localPercentage > 100 || isNaN(localPercentage)) {
      return "N/A"; 
    }
  
    const internationalPercentage = 100 - localPercentage;
    const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
  
    const divisor = gcd(localPercentage, internationalPercentage);
    
  
    const simplifiedLocal = localPercentage / divisor;
    const simplifiedInternational = internationalPercentage / divisor;
    console.log(`${simplifiedLocal}:${simplifiedInternational}`)
    return `${simplifiedLocal}:${simplifiedInternational}`;
  };

  