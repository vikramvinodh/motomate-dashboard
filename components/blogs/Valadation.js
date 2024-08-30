// Define a regex pattern for numeric values
const numericRegex = /^[0-9]+$/;

export function validateFields(state, content) {
    const {
        title,
        author,
        category,
        slug,
        readTime,
        interested,
        view,
        share,
        meta_key,
        meta_description,
        meta_title,
        meta_robots,
        smalldesc
    } = state;

    if (content && !content) {
        return "Body field should be filled.";
    }
    if (!title) {
        return "Title field should be filled.";
    }
    if (!slug) {
        return "Slug field should be filled.";
    }
    if (!author) {
        return "Author field should be filled.";
    }
    if (!category) {
        return "Category field should be filled.";
    }
    if (!meta_key) {
        return "Meta Key field should be filled.";
    }
    if (!meta_description) {
        return "Meta Description field should be filled.";
    }
    if (!meta_title) {
        return "Meta Title field should be filled.";
    }
    if (!meta_robots) {
        return "Meta Robots field should be filled.";
    }

    if (!smalldesc) {
        return "Small Description field should be filled.";
    }

    if (!numericRegex.test(readTime)) {
        return "ReadTime should contain only numbers.";
    }
    if (!numericRegex.test(interested)) {
        return "Interested should contain only numbers.";
    }
    if (!numericRegex.test(view)) {
        return "View should contain only numbers.";
    }
    if (!numericRegex.test(share)) {
        return "Share should contain only numbers.";
    }

    // If all validations pass, return null to indicate success
    return null;
}



export function validateCategoryFields(state) {
    const {
        title,
        name,
        description
    } = state;

    if (!title) {
        return "Title field should be filled.";
    }
    if (!name) {
        return "Name field should be filled.";
    }
    if (!description) {
        return "DEscription field should be filled.";
    }

    // If all validations pass, return null to indicate success
    return null;
}


export function validateAuthorFields(state) {
    const {
        name,
        designation,
        description,
        since_year
    } = state;

    if (!name) {
        return "Name field should be filled.";
    }
    if (!designation) {
        return "Designation field should be filled.";
    }
    if (!description) {
        return "Description field should be filled.";
    }
    if (!numericRegex.test(since_year)) {
        return "Since Year Field should be filled and contain only numbers.";
    }

    // If all validations pass, return null to indicate success
    return null;
}


