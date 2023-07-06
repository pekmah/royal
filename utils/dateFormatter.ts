import moment from "moment";

export function formatDate(dateStr: string) {
    return moment(dateStr).format("MMMM Do, YYYY");
}
