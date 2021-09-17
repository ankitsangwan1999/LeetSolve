/**
 * PFB the Response structure sent to FrontEnd after manipulating response from Leetcode.com
 *
 * isTimeOut => true when request to LC did not succeeded, esle false
 * doesCookieExist => true when cookie is stored with electron or sent by user via form, else false
 * isCookieValid => true when doesCookieExist === true and valid response returned by LC, else false
 * wasCookieSent => true when cookie was sent through form, else false
 */

const response = {
	message: {
		username: "",
		isTimeOut: false,
		doesCookieExist: false,
		isCookieValid: false,
		wasCookieSent: false,
	},
	data: {
		user_name: "ABC",
		stat_status_pairs: [
			{
				stat: {
					question_id: 2141,
					question__article__live: null,
					question__article__slug: null,
					question__article__has_video_solution: null,
					question__title:
						"Smallest Greater Multiple Made of Two Digits",
					question__title_slug:
						"smallest-greater-multiple-made-of-two-digits",
					question__hide: false,
					total_acs: 329,
					total_submitted: 574,
					frontend_question_id: 1999,
					is_new_question: true,
				},
				status: null,
				difficulty: {
					level: 2,
				},
				paid_only: true,
				is_favor: false,
				frequency: 0,
				progress: 0,
			},
			{
				stat: {
					question_id: 2141,
					question__article__live: null,
					question__article__slug: null,
					question__article__has_video_solution: null,
					question__title:
						"Smallest Greater Multiple Made of Two Digits",
					question__title_slug:
						"smallest-greater-multiple-made-of-two-digits",
					question__hide: false,
					total_acs: 329,
					total_submitted: 574,
					frontend_question_id: 1999,
					is_new_question: true,
				},
				status: null,
				difficulty: {
					level: 2,
				},
				paid_only: true,
				is_favor: false,
				frequency: 0,
				progress: 0,
			},
		],
	},
};
