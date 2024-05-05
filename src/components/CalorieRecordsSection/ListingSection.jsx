import RecordList from "./RecordList";
function ListingSection(props) {
  const { allRecords } = props;
  return <RecordList records={allRecords} />;
}

export default ListingSection;
