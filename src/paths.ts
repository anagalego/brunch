const paths = {
    //Top Brunches (rating) 
    home() {
        return `/`;
    },
    reservations() {
        return `/reservations`;
    },
    favourites() {
        return `/favourites`;
    },
    search() {
        return `/search`;
    },
    brunchDetail(brunchSlug: string) {
        return `/brunches/${brunchSlug}`;
    },
    profileDetail() {
        return `/profile`;
    },
    activityDetail() {
        return `/activity`;
    },
    businessDashboard() {
        return `/business`;
    },
    businessBrunches() {
        return `/business/brunches`;
    },
    businessBrunchDetail(brunchSlug: string) {
        return `/business/brunches/${brunchSlug}`;
    },
    brunchDetailEditMode(brunchSlug: string) {
        return `/business/brunches/${brunchSlug}/edit`;
    },
    brunchCreate() {
        return `/business/brunches/new`;
    },
    businessReservations() {
        return `/business/reservations`;
    }
}

export default paths;