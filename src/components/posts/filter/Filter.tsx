import { InputFilter, SearchSection } from './Filter.styles';

interface Props {
  onType: (term: string) => void;
}

export default function Filter({ onType }: Props) {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onType(e.target.value);
  };

  return (
    <SearchSection>
      <InputFilter
        type="search"
        onChange={onChange}
        autoCorrect="false"
        autoComplete="false"
        placeholder="Filter by title"
      />
    </SearchSection>
  );
}
