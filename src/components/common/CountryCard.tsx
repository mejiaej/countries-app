import { useState } from 'react';
import './CountryCard.css';

interface CountryCardFrontProps {
  officialName: string;
  flagUrl: string;
}

interface CountryCardBackProps {
  officialName: string;
  region: string;
  capital: string | null;
  population: string;
}

const CountryCardFront = ({ flagUrl, officialName }: CountryCardFrontProps) => (
  <>
    <img
      data-testid='card-front-img'
      className="flag"
      src={flagUrl}
      loading="lazy"
      alt={`${officialName} flag`}
    />
    <h4 data-testid="card-front-name" className="mt-10">{officialName}</h4>
  </>
);

const CountryCardBack = ({
  officialName,
  region,
  capital,
  population,
}: CountryCardBackProps) => (
  <>
    <h4 className="mt-5">{officialName}</h4>
    <div className="mt-5">{`Region: ${region}`}</div>
    <div className="mt-5">{`Capital: ${capital || 'unkown'}`}</div>
    <div className="mt-5">{`Population: ${population}`}</div>
  </>
);

interface CountryCardProps {
  flagUrl: string;
  officialName: string;
  region: string;
  capital: string | null;
  population: string;
  className?: string;
}

const CountryCard = ({
  officialName,
  region,
  capital,
  population,
  flagUrl,
  className,
}: CountryCardProps) => {
  const [showFront, setShowFront] = useState(true);

  const flipCard = () => {
    setShowFront((prevShowFront) => !prevShowFront);
  };

  return (
    <div onClick={flipCard} className={`country-card-container ${className}`}>
      {showFront ? (
        <CountryCardFront flagUrl={flagUrl} officialName={officialName} />
      ) : (
        <CountryCardBack
          officialName={officialName}
          region={region}
          capital={capital}
          population={population}
        />
      )}
    </div>
  );
};

export { CountryCard };
