import { useQuery } from "react-query";
const { apiurl } = require("constants/apiURLsConstants");
const { getRequest } = require("services/axios-api-request/axios_api_Request");


// ************* stream dropdown ***********
const fetchStreamList = () => {
    return getRequest(apiurl?.SUBJECT_STREAM_URL);
}
export const useStreamDropdown = () => {
    return useQuery(
        'stream-dropdown-list',
        fetchStreamList,
        {
            refetchOnWindowFocus: false,
        }
    )
}

// ************* class dropdown ***********
const fetchClassList = () => {
    return getRequest(apiurl?.CLASS_DROPDOWN_LIST_URL);
}
export const useClassDropdown = () => {
    return useQuery(
        'class-dropdown-list',
        fetchClassList,
        {
            refetchOnWindowFocus: false,
        }
    )
}


// ************* subject dropdown ***********
const fetchSubjectList = () => {
    return getRequest(apiurl?.SUBJECT_LIST_URL);
}

export const useSubjectDropdown = () => {
    return useQuery(
        'subject-dropdown-list',
        fetchSubjectList,
        {
            refetchOnWindowFocus: false,
        }
    )
}

// ************* branch dropdown ***********
const fetchBranchList = ({ queryKey }) => {
    return getRequest(apiurl?.BRANCH_LIST_URL, { subject_id: queryKey[1] });
}

export const useBranchDropdown = (subjectId) => {
    return useQuery(
        ['branch-dropdown-list', subjectId],
        fetchBranchList,
        {
            enabled: subjectId !== '',
            refetchOnWindowFocus: false,
        }
    )
}

// ************* chapter dropdown ***********
const fetchChapterList = ({ queryKey }) => {
    return getRequest(apiurl?.CHAPTER_LIST_URL, { branch_id: queryKey[1] });
}

export const useChapterDropdown = (branchId) => {
    return useQuery(
        ['chapter-dropdown-list', branchId],
        fetchChapterList,
        {
            enabled: branchId !== '',
            refetchOnWindowFocus: false,
        }
    )
}

// ************* chapter dropdown depend upon subject_id ***********
const fetchChapterListSubject = ({ queryKey }) => {
    return getRequest(apiurl?.CHAPTER_LIST_URL, { subject_id: queryKey[1] });
}

export const useChapterDropdownSubject = (subjectId) => {
    return useQuery(
        ['chapter-subject-dropdown-list', subjectId],
        fetchChapterListSubject,
        {
            enabled: subjectId !== '',
            refetchOnWindowFocus: false,
        }
    )
}


// ************* source dropdown ***********
const fetchSourceList = () => {
    return getRequest(apiurl?.SOURCE_LIST_URL);
}

export const useSourceDropdown = () => {
    return useQuery(
        'source-dropdown-list',
        fetchSourceList,
        {
            refetchOnWindowFocus: false,
        }
    )
}

// ************* sub-source dropdown depend upon source_id ***********
const fetchSubSourceListSource = ({ queryKey }) => {
    return getRequest(apiurl?.SUB_SOURCE_LIST_URL, { source_id: queryKey[1] });
}

export const useSubSourceDropdownSource = (sourceId, isTestSeries) => {
    return useQuery(
        ['chapter-dropdown-list', sourceId],
        fetchSubSourceListSource,
        {
            enabled: isTestSeries,
            refetchOnWindowFocus: false,
        }
    )
}

// ************* role assign dropdown depend upon role ***********
const fetchRoleAssignListSource = ({ queryKey }) => {
    return getRequest(apiurl?.EMPLOYEE_LIST_URL, { role: queryKey[1] });
}

export const useRoleAssignDropdownRole = (role, validRole) => {
    return useQuery(
        ['role-assign-dropdown-list', role],
        fetchRoleAssignListSource,
        {
            enabled: validRole,
            refetchOnWindowFocus: false,
        }
    )
}

// ************* task type dropdown ***********
const fetchTaskTypeList = () => {
    return getRequest(apiurl?.TASK_TYPE_LIST_URL);
}
export const useTaskTypeDropdown = () => {
    return useQuery(
        'task-type-dropdown-list',
        fetchTaskTypeList,
        {
            refetchOnWindowFocus: false,
        }
    )
}