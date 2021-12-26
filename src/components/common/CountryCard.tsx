import './CountryCard.css';

interface CountryCardProps {
  officialName: string;
  flagUrl: string;
  className?: string;
}

const CountryCard = ({
  officialName,
  flagUrl,
  className,
}: CountryCardProps) => {
  return (
    <div className={`country-card-container ${className}`}>
      <img
        className="flag"
        src={flagUrl}
        loading="lazy"
        alt={`${officialName} flag`}
      />
      <h4 className="mt-10">{officialName}</h4>
    </div>
  );
};

export { CountryCard };
