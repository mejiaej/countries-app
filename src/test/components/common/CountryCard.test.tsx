import { fireEvent, render, screen } from '@testing-library/react';
import { CountryCard } from '../../../components/common/CountryCard';

describe('<CountryCard />', () => {
  it('renders CountryCard front', () => {
    const props = {
      officialName: 'Name',
      region: 'Region',
      capital: 'Capital',
      population: Number(11_000_00).toLocaleString(),
      flagUrl: 'https://flagcdn.com/se.svg',
    };
    render(<CountryCard {...props} />);

    expect(screen.getByTestId('card-front-img')).toHaveAttribute('src', props.flagUrl);
    expect(screen.getByTestId('card-front-name')).toHaveTextContent(props.officialName);
    expect(screen.queryByText(props.region)).not.toBeInTheDocument();
  });

  it('renders CountryCard back', () => {
    const props = {
      officialName: 'Name',
      region: 'Region',
      capital: 'Capital',
      population: Number(11_000_00).toLocaleString(),
      flagUrl: 'https://flagcdn.com/se.svg',
    };
    render(<CountryCard {...props} />);
    const flagImage = screen.getByTestId('card-front-img');
    fireEvent.click(flagImage);

    expect(screen.getByTestId('card-back-name')).toHaveTextContent(props.officialName);
    expect(screen.getByTestId('card-back-region')).toHaveTextContent(props.region);
    expect(screen.getByTestId('card-back-capital')).toHaveTextContent(props.capital);
    expect(screen.getByTestId('card-back-population')).toHaveTextContent(props.population);
  });


  it('snapshot', () => {
    const props = {
      officialName: 'Name',
      region: 'Region',
      capital: 'Capital',
      population: Number(11_000_00).toLocaleString(),
      flagUrl: 'https://flagcdn.com/se.svg',
    };
    const view =render(<CountryCard {...props} />);
    expect(view).toMatchSnapshot();
  });
});
