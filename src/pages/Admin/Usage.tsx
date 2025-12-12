import useTokenHistory from "../../hooks/TokenHistory/useTokenHistory";
import { Container } from "@mui/material";
import TokensTable from "../../components/common/Tables/TokensTable"; //Date Picker Imports - these should just be in your Context Provider
export default function Usage() {
  const { data, isPending } = useTokenHistory();

  return (
    <div className="overflow-x-auto">
      <Container sx={{ mt: "2rem" }}>
        <TokensTable data={data?.list || []} isDataLoading={isPending} />
      </Container>
    </div>
  );
}
