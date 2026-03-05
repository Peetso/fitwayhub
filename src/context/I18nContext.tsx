import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';
import { getApiBase } from '@/lib/api';

type Lang = 'en' | 'ar';

const translations: Record<Lang, Record<string, string>> = {
  en: {
    // ── Nav & Layout ──
    nav_home: 'Home',
    nav_workouts: 'Workouts',
    nav_steps: 'Steps',
    nav_analytics: 'Analytics',
    nav_coaching: 'Coaching',
    nav_community: 'Community',
    nav_chat: 'Chat',
    nav_tools: 'Tools',
    nav_profile: 'Profile',
    fitway_hub: 'Fitway Hub',
    sign_out: 'Sign Out',
    go_to_app: 'Go to App',
    dashboard: 'Dashboard',
    requests: 'Requests',
    athletes: 'Athletes',
    messages: 'Messages',
    my_ads: 'My Ads',
    pricing: 'Pricing',

    // ── Auth ──
    welcome_back: 'Welcome back',
    sign_in_continue: 'Sign in to continue your journey',
    email_label: 'Email',
    password_label: 'Password',
    remember_me: 'Remember me',
    forgot_password: 'Forgot password?',
    signing_in: 'Signing in...',
    sign_in: 'Sign In',
    or: 'or',
    continue_google: 'Continue with Google',
    continue_facebook: 'Continue with Facebook',
    no_account: "Don't have an account?",
    sign_up_free: 'Sign up free',
    create_account: 'Create account',
    join_community_start: 'Join the community and start your journey',
    joining_as: 'I am joining as',
    athlete: 'Athlete',
    train_progress: 'Train & progress',
    coach: 'Coach',
    membership_required: 'Membership required',
    full_name: 'Full Name',
    min_chars: 'Min. 8 characters',
    creating_account: 'Creating account...',
    join_as_coach: 'Join as Coach',
    join_as_athlete: 'Join as Athlete',
    sign_up_google: 'Sign up with Google',
    sign_up_facebook: 'Sign up with Facebook',
    have_account: 'Already have an account?',
    sign_in_link: 'Sign in',
    terms: 'Terms',
    privacy_policy: 'Privacy Policy',
    agree_terms: 'By creating an account, you agree to our',
    back: 'Back',
    transform_body: 'Transform your body.',
    empower_mind: 'Empower your mind.',
    egypt_fitness: "Egypt's #1 digital fitness ecosystem. Certified programs, smart tracking, and a community that keeps you accountable.",
    members: 'Members',
    programs: 'Programs',
    rating: 'Rating',
    coach_membership_required: '🔒 Coach Membership Required',
    coach_membership_msg: 'Coach accounts require an active paid membership to log in. Please contact admin or complete your membership payment.',
    failed_login: 'Failed to login',
    failed_register: 'Failed to register',
    valid_email: 'Please enter a valid email address',
    password_min: 'Password must be at least 8 characters long',
    password_good: 'Password strength is good',
    chars_needed: 'more character(s) needed',

    // ── Dashboard ──
    good_morning: 'Good Morning',
    good_afternoon: 'Good Afternoon',
    good_evening: 'Good Evening',
    ready_goals: 'Ready to crush your goals today?',
    greeting_hello: 'Hello, {name}! 👋',
    of_goal: '% of goal',
    daily_step_goal: 'Daily Step Goal',
    set_by_coach: 'SET BY COACH',
    steps_taken: 'steps taken',
    goal: 'Goal',
    remaining: 'remaining',
    todays_plan_title: "Today's Plan",
    view_all: 'View all',
    no_plan_yet: 'No Plan Yet',
    no_plan_desc: "Your coach hasn't assigned a plan yet.",
    find_coach_or_browse: 'Find a coach or browse workouts to get started.',
    find_coach: 'Find a Coach',
    find_coaches: 'Find Coaches',
    start: 'Start',
    exercises: 'exercises',
    sets: 'sets',
    reps: 'reps',
    rest: 'rest',
    show_less: 'Show less',
    no_exercises_today: 'No exercises scheduled for today',
    no_meals_yet: 'No meals scheduled yet',
    quick_tools: 'Quick Tools',
    tool_bmi_calc: 'BMI Calc',
    tool_macros: 'Macros',
    tool_steps: 'Steps',
    tool_water: 'Water',
    step_sync: 'Step Sync',
    water_log: 'Water Log',
    sponsored: 'SPONSORED',
    learn_more: 'Learn More',
    featured_coaches: 'Featured Coaches',
    book_now: 'Book Now',
    ai_performance_analysis: 'AI Performance Analysis',
    performance_rating: 'Performance Rating',
    health_advice: 'Health Advice',
    motivational_message: 'Motivational Message',
    tomorrows_goal: "Tomorrow's Goal",
    steps: 'steps',
    cannot_update_goal: 'Cannot update goal',
    edit: 'Edit',

    // ── Steps & Activity ──
    stat_steps: 'Steps',
    stat_calories: 'Calories',
    stat_water: 'Water',
    stat_activity: 'Activity',
    activity_tracker: 'Activity Tracker',
    activity_sub: 'Track your daily activity with precision',
    steps_activity: 'Steps & Activity',
    goal_reached: '🎉 Goal Reached!',
    steps_to_go: 'steps to go',
    start_tracking: 'Start tracking to see your progress',
    week_total: 'Week Total',
    daily_avg: 'Daily Avg',
    peak_day: 'Peak Day',
    calories: 'Calories',
    days: 'days',
    steps_day: 'steps/day',
    highest: 'highest',
    burned: 'burned',
    record_activity: 'Record Activity',
    manual: 'Manual',
    live: 'Live',
    activity_type: 'Activity Type',
    walking: 'Walking',
    running: 'Running',
    date: 'Date',
    distance_km: 'Distance (km)',
    any_notes: 'Any notes…',
    saving: 'Saving…',
    save_activity: 'Save Activity',
    distance_unit: 'Distance Unit',
    live_tracking: 'Live Tracking',
    live_tracking_premium: 'Live GPS tracking is available for Premium members and during the 7-day free trial.',
    upgrade_premium: 'Upgrade to Premium',
    today_label: 'Today',
    weekly: 'Weekly',
    monthly: 'Monthly',
    todays_summary: "Today's Summary",
    distance: 'Distance',
    no_activity_today: 'No activity recorded today yet.',
    weekly_breakdown: 'Weekly Breakdown',
    monthly_history: 'Monthly History',
    delete_entry_confirm: 'Are you sure you want to delete this entry?',
    entry_deleted: 'Entry deleted successfully!',
    valid_steps: 'Please enter valid steps',
    steps_saved_offline: 'Steps saved locally. Will sync when online.',
    steps_recorded: 'Steps recorded successfully!',
    goal_reached_bonus: 'Goal reached! +2 bonus points awarded!',
    saved_offline: 'Saved offline (connection issue). Will sync when online.',
    error_adding_steps: 'Error adding steps',
    live_session_saved: 'Live tracking session saved.',
    live_session_failed: 'Failed to save tracking session.',
    sync_failed: 'Sync failed — will retry when connection is stable.',
    back_online_sync: 'Back online! Syncing offline data...',
    offline_saved: 'You are offline. Steps will be saved locally and synced when online.',
    geolocation_not_supported: 'Geolocation is not supported on this device or browser.',
    failed_start_tracking: 'Failed to start tracking',
    notes: 'Notes',
    trial_remaining: 'Trial — {n} days remaining',

    // ── Workouts ──
    workouts_title: 'Workout Programs',
    training: 'Training',
    workouts: 'Workouts',
    videos: 'Videos',
    my_plan: 'My Plan',
    search_videos: 'Search videos...',
    all: 'All',
    loading_videos: 'Loading videos...',
    no_videos_yet: 'No Videos Yet',
    no_videos_desc: "Your coach or admin hasn't uploaded any workout videos yet. Check back soon!",
    no_match: 'No videos match your search',
    no_match_desc: 'Try adjusting your search or category filter.',
    premium_only: 'Premium Only',
    premium: 'Premium',
    watch_now: 'Watch Now',
    premium_video_msg: 'This video requires a Premium subscription.',
    points_for_watching: '🎉 +2 points for watching!',
    no_plan_assigned: 'No Plan Assigned Yet',
    no_plan_assigned_desc: "Your coach hasn't assigned a plan yet. Book a coaching session to get your personalized workout and nutrition plan.",
    nutrition_plan: 'Nutrition Plan',
    protein: 'Protein',
    carbs: 'Carbs',
    fat: 'Fat',
    cannot_embed: 'Cannot embed this video.',
    open_video: 'Open Video',
    browse: 'Browse',
    default_upper_body: 'Upper Body Power',
    default_today_notes: '45 mins • Dumbbells • Assigned by your coach',
    workout_complete: 'Workout complete! You earned {pts} point(s).',
    my_workout_plan: 'My Workout Plan',
    my_workout_plan_placeholder: 'Your coach-selected workout plan will appear here. If you have a private coach they can add sessions and progress.',
    my_nutrition_plan: 'My Nutrition Plan',
    my_nutrition_placeholder: 'Your coach can provide daily meal plans and macros here.',
    start_workout: 'Start Workout',

    // ── Tools ──
    fitness_tools: 'Fitness Tools',
    calorie_calculator: 'Calorie Calculator',
    bmi_calculator: 'BMI Calculator',
    bmi_desc: 'Calculate your Body Mass Index to check if you\'re in a healthy weight range.',
    height_cm: 'Height (cm)',
    weight_kg: 'Weight (kg)',
    calculate_bmi: 'Calculate BMI',
    your_bmi: 'Your BMI',
    underweight: 'Underweight',
    normal_weight: 'Normal Weight',
    overweight: 'Overweight',
    obese: 'Obese',
    hydration_calculator: 'Hydration Calculator',
    hydration_desc: 'Estimate your daily water intake based on weight and activity.',
    activity_level: 'Activity Level',
    low_activity: 'Low Activity',
    moderate_activity: 'Moderate Activity',
    high_activity: 'High Activity',
    calculate_water: 'Calculate Water Intake',
    daily_water: 'Daily Water Intake',
    ml: 'ml',
    liters: 'liters',
    macro_calculator: 'Macro Nutrients Calculator',
    macro_desc: 'Search 200+ foods, view nutrition breakdown & find perfect pairings',

    // ── Coaching ──
    personal_coaching: 'Personal Coaching',
    book: 'Book',
    chat: 'Chat',
    premium_feature: 'Premium Feature',
    premium_feature_title: 'Premium Feature',
    premium_feature_desc: 'Unlock advanced analytics to track your weight trends, detailed activity breakdown, and performance metrics.',
    premium_coaching_title: 'Premium Coaching',
    premium_coaching_desc: 'Get personalized guidance, form checks, and custom plans from our certified expert trainers.',
    my_sessions: 'My Sessions',
    book_with: 'Book with {coach}',
    date_label: 'Date',
    time_label: 'Time',
    note_label: 'Note',
    booking_requested: 'Booking requested. Check My Sessions for confirmation.',
    booking_failed: 'Failed to request booking.',
    upcoming_sessions: 'Upcoming Sessions',
    form_check_review: 'Form Check & Review',
    with_coach: 'with {coach}',
    tomorrow_label: 'Tomorrow',

    // ── Pricing ──
    back_to_plans: 'Back to plans',
    premium_annual: 'Premium Annual',
    premium_monthly: 'Premium Monthly',
    egp_month: 'EGP/month',
    annual_save: 'Annual (save 25%)',
    annual_total: 'Annual total',
    monthly_charge: 'Monthly charge',
    unlock_potential: 'Unlock Your Full Potential',
    unlock_desc: 'Get personalized coaching, advanced analytics, and exclusive programs.',
    free_plan: 'Free Plan',
    free_desc: 'Essential tools to get you moving.',
    basic_workouts: 'Basic Workout Programs',
    community_access: 'Community Access',
    basic_tracking: 'Basic Progress Tracking',
    advanced_analytics: 'Advanced Analytics',
    one_on_one: '1-on-1 Coaching',
    custom_meals: 'Custom Meal Plans',
    switch_free: 'Switch to Free',
    current_plan: 'Current Plan',
    recommended: 'RECOMMENDED',
    everything_results: 'Everything for serious results.',
    all_workouts: 'All Workout Programs',
    advanced_insights: 'Advanced Analytics & Insights',
    coaching_chat: '1-on-1 Coaching Chat',
    personalized_nutrition: 'Personalized Nutrition Plans',
    live_gps: 'Live GPS Tracking',
    priority_support: 'Priority Support',
    active_plan: 'Active Plan ✓',
    upgrade_now: 'Upgrade Now',
    faster_results: 'Faster Results',
    faster_desc: 'Premium members reach their goals 2x faster on average.',
    expert_guidance: 'Expert Guidance',
    expert_desc: 'Direct access to certified trainers for form checks and advice.',
    exclusive_content: 'Exclusive Content',
    exclusive_desc: 'New premium-only programs added every month.',

    // ── Onboarding ──
    step_n: 'STEP {n}/{total}',
    main_goal: "What's your main goal?",
    tell_about: 'Tell us about yourself',
    activity_health: 'Activity & Health',
    set_targets: 'Set your targets',
    lose_weight: 'Lose Weight',
    maintain_weight: 'Maintain Weight',
    gain_weight: 'Gain Weight',
    build_muscle: 'Build Muscle',
    continue_btn: 'Continue',
    gender: 'Gender',
    male: 'Male',
    female: 'Female',
    date_of_birth: 'Date of Birth',
    activity_level_label: 'Activity Level',
    sedentary: 'Sedentary',
    sedentary_desc: 'Little or no exercise',
    light: 'Light',
    light_desc: '1–3 days/week',
    moderate: 'Moderate',
    moderate_desc: '3–5 days/week',
    active: 'Active',
    active_desc: '6–7 days/week',
    very_active: 'Very Active',
    very_active_desc: 'Hard exercise daily',
    medical_history: 'Medical History (optional)',
    medical_placeholder: 'Any injuries or conditions…',
    target_weight: 'Target Weight (kg)',
    weekly_goal: 'Weekly Goal (kg/week)',
    daily_steps_goal: 'Daily Steps Goal',
    finish_setup: 'Finish Setup',

    // ── Analytics ──
    generate_ai_insights: 'Generate AI Insights',
    summary: 'Summary',
    loading: 'Loading...',
    total_steps: 'Total Steps',
    total_distance: 'Total Distance',
    total_calories: 'Total Calories',
    premium_sessions: 'Premium Sessions',
    recent_sessions: 'Recent Sessions',
    performance_metrics: 'Performance Metrics',
    avg_daily_steps: 'Avg. Daily Steps',
    total_sessions: 'Total Sessions',
    calories_burned: 'Calories Burned',
    consistency: 'Consistency',

    // ── Chat ──
    contacts: 'Contacts',
    groups: 'Groups',
    search_placeholder: 'Search...',
    now: 'Now',
    role_coach: 'Coach',
    role_user: 'User',
    type_message: 'Type a message...',
    type_message_placeholder: 'Type a message...',
    select_contact_start: 'Select a contact to start chatting',
    no_data_today_start: 'No activity recorded today yet.',

    // ── Profile ──
    profile_title: 'My Profile',
    premium_member: 'Premium Member',
    upgrade_premium: 'Upgrade to Premium',
    points: 'Points',
    points_history: 'Points History',
    hide_history: 'Hide history',
    view_history: 'View history',
    how_to_earn_points: 'How to earn points:',
    points_rule_signup: 'Sign up (welcome gift)',
    points_rule_video: 'Watch a full workout video',
    points_rule_steps: 'Complete your daily step goal',
    no_point_transactions: 'No point transactions yet.',
    pts: 'pts',
    physical_stats: 'Physical Stats',
    body_metrics: 'Body Metrics',
    save_changes: 'Save Changes',
    edit_stats: 'Edit Stats',
    edit: 'Edit',
    height_label: 'Height',
    weight_label: 'Weight',
    medical_history_short: 'Medical History',
    medical_history_private: 'Your medical history is private and only shared with your coach when you book a session.',
    medical_history_placeholder_full: 'Enter any medical conditions, allergies, injuries, medications, or health notes...',
    attach_medical_document: 'Attach Medical Document (optional)',
    view_uploaded_document: 'View uploaded document',
    click_to_replace: 'Click to replace',
    upload_document_prompt: 'Upload PDF, image, or document',
    save_medical_history: 'Save Medical History',
    medical_history_saved: '✅ Medical history saved',
    settings: 'Settings',
    account_details: 'Account Details',
    hide: 'Hide',
    name_label: 'Name',
    save: 'Save',
    cancel: 'Cancel',
    notifications: 'Notifications',
    language_label: 'Language',
    theme: 'Theme',
    dark: 'Dark',
    light_theme: 'Light',
    saving: 'Saving...',

    // ── Community ──
    community: 'Community',
    share_insight: 'Share an insight, tip, or success story...',
    create_post: 'Create Post',
    publish_post: 'Publish Post',
    trending: 'Trending',
    likes: 'Likes',
    comments: 'Comments',
    announcement: 'Announcement',
    pinned: 'Pinned',
    challenges: 'Challenges',
    feed: 'Feed',
    post: 'Post',
    no_posts: 'No posts yet. Be the first to share something!',

    // ── Coach Pages ──
    my_athletes: 'My Athletes',
    select_athlete: 'Select an athlete to manage their plans',
    overview: 'Overview',
    workout: 'Workout',
    nutrition: 'Nutrition',
    step_goal_label: 'Daily Step Goal',
    workout_plan: 'Workout Plan',
    nutrition_plan_label: 'Nutrition Plan',
    manage_plan: 'Manage Plan',
    edit_profile: 'Edit Coach Profile',
    session_rate: 'Session Rate',
    monthly_plan: 'Monthly Plan',
    yearly_plan: 'Yearly Plan',
    plan_type: 'Plan Type',
    available: 'Available',
    unavailable: 'Unavailable',
    earnings_credit: 'Earnings & Credit',
    available_credit: 'Available Credit',
    withdraw: 'Withdraw',
    request_withdrawal: 'Request Withdrawal',
    withdrawal_history: 'Withdrawal History',
    recent_transactions: 'Recent Transactions',
    about_me: 'About Me',
    reviews: 'Reviews',
    profile_empty: 'Your profile is empty',
    profile_empty_desc: 'Edit your profile to be discoverable by athletes searching for coaches.',
    setup_profile: 'Set Up Profile',
    save_profile: 'Save Profile',
    profile_updated: '✅ Profile updated! Athletes can now find you.',
    failed_save: '❌ Failed to save.',
    payment_info: 'Payment Info (for withdrawals)',
    payment_info_saved: '✅ Payment info saved!',
    failed_payment_info: '❌ Failed to save payment info.',
    submit: 'Submit',
    enter_valid_amount: 'Enter a valid amount',
    insufficient_credit: 'Insufficient credit balance',
    set_payment_first: 'Set your payment info first',
    withdrawal_submitted: '✅ Withdrawal request submitted!',
    failed_withdrawal: '❌ Failed to request withdrawal',
    fitness_coach: 'Fitness Coach',
    not_set: 'Not set',
    save_payment_info: 'Save Payment Info',
    amount_egp: 'Amount (EGP)',
    card_holder_name: 'Card Holder Name',
    card_number: 'Card Number',
    workout_only: 'Workout Only',
    nutrition_only: 'Nutrition Only',
    specialty_placeholder: 'e.g. Strength & Conditioning',
    location_placeholder: 'e.g. Cairo, Egypt',
    plan_type_offered: 'Plan Type Offered',
    complete_plan: 'Complete Plan',
    workout_only_desc: 'Strength & conditioning only',
    nutrition_only_desc: 'Meal plans & nutrition coaching',
    monthly_subscription_price: 'Monthly Subscription Price (EGP)',
    yearly_subscription_price: 'Yearly Subscription Price (EGP)',
    e_g_300: 'e.g. 300',
    e_g_3000: 'e.g. 3000',
    bio_placeholder: 'Describe your coaching philosophy...',
    availability: 'Availability',
    available_for_clients: 'Available for new clients',

    // ── Coach Ads ──
    create_ad: 'Create Ad',
    ad_rate_info: 'Rate: 4 EGP / minute of active boosting. Pay via e-wallet with proof.',
    impressions: 'Impressions',
    clicks: 'Clicks',
    ctr: 'CTR',
    active_label: 'Active',
    pending: 'Pending',
    spent: 'Spent',
    no_ads: 'No ads yet',
    create_first_ad: 'Create your first sponsored ad',
    ad_placement: 'Ad Placement',
    community_post: '📱 Community Post',
    home_banner: '🏠 Home Banner',
    ad_objective: 'Ad Objective',
    ad_title: 'Ad Title',
    description: 'Description',
    specialty: 'Specialty',
    call_to_action: 'Call to Action',
    boost_duration: 'Boost Duration',
    time_spent: 'Time Spent',
    money_spent: 'Money Spent',
    time_left: 'Time Left',
    money_left: 'Money Left',
    payment: 'Payment',
    submit_pay: 'Submit & Pay',

    // ── Admin ──
    admin_dashboard: 'Admin Dashboard',
    users: 'Users',
    payments: 'Payments',
    content: 'Content',
    website: 'Website',
  },
  ar: {
    // ── Nav & Layout ──
    nav_home: 'الصفحة الرئيسية',
    nav_workouts: 'التمارين',
    nav_steps: 'الخطوات',
    nav_analytics: 'التحليلات',
    nav_coaching: 'التدريب',
    nav_community: 'المجتمع',
    nav_chat: 'الدردشة',
    nav_tools: 'الأدوات',
    nav_profile: 'الملف الشخصي',
    fitway_hub: 'فيت واي هب',
    sign_out: 'تسجيل الخروج',
    go_to_app: 'اذهب إلى التطبيق',
    dashboard: 'لوحة التحكم',
    requests: 'الطلبات',
    athletes: 'الرياضيون',
    messages: 'الرسائل',
    my_ads: 'إعلاناتي',
    pricing: 'الأسعار',

    // ── Auth ──
    welcome_back: 'مرحبًا بعودتك',
    sign_in_continue: 'سجّل الدخول لمتابعة رحلتك',
    email_label: 'البريد الإلكتروني',
    password_label: 'كلمة المرور',
    remember_me: 'تذكرني',
    forgot_password: 'نسيت كلمة المرور؟',
    signing_in: 'جارٍ تسجيل الدخول...',
    sign_in: 'تسجيل الدخول',
    or: 'أو',
    continue_google: 'المتابعة بحساب Google',
    continue_facebook: 'المتابعة بحساب Facebook',
    no_account: 'ليس لديك حساب؟',
    sign_up_free: 'سجّل مجانًا',
    create_account: 'إنشاء حساب',
    join_community_start: 'انضم للمجتمع وابدأ رحلتك',
    joining_as: 'أنضم كـ',
    athlete: 'رياضي',
    train_progress: 'تمرّن وتقدّم',
    coach: 'مدرب',
    membership_required: 'عضوية مطلوبة',
    full_name: 'الاسم الكامل',
    min_chars: '٨ أحرف على الأقل',
    creating_account: 'جارٍ إنشاء الحساب...',
    join_as_coach: 'انضم كمدرب',
    join_as_athlete: 'انضم كرياضي',
    sign_up_google: 'سجّل بحساب Google',
    sign_up_facebook: 'سجّل بحساب Facebook',
    have_account: 'لديك حساب بالفعل؟',
    sign_in_link: 'تسجيل الدخول',
    terms: 'الشروط',
    privacy_policy: 'سياسة الخصوصية',
    agree_terms: 'بإنشاء حساب، أنت توافق على',
    back: 'رجوع',
    transform_body: 'غيّر جسمك.',
    empower_mind: 'قوّي عقلك.',
    egypt_fitness: 'منظومة اللياقة الرقمية الأولى في مصر. برامج معتمدة، تتبع ذكي، ومجتمع يبقيك ملتزمًا.',
    members: 'أعضاء',
    programs: 'برامج',
    rating: 'التقييم',
    coach_membership_required: '🔒 عضوية المدرب مطلوبة',
    coach_membership_msg: 'حسابات المدرب تتطلب عضوية مدفوعة نشطة لتسجيل الدخول. يرجى التواصل مع الإدارة أو إتمام دفع العضوية.',
    failed_login: 'فشل تسجيل الدخول',
    failed_register: 'فشل التسجيل',
    valid_email: 'يرجى إدخال بريد إلكتروني صحيح',
    password_min: 'كلمة المرور يجب أن تكون ٨ أحرف على الأقل',
    password_good: 'قوة كلمة المرور جيدة',
    chars_needed: 'حرف/أحرف مطلوبة إضافية',

    // ── Dashboard ──
    good_morning: 'صباح الخير',
    good_afternoon: 'مساء الخير',
    good_evening: 'مساء الخير',
    ready_goals: 'هل أنت مستعد لتحقيق أهدافك اليوم؟',
    greeting_hello: 'مرحبًا، {name}! 👋',
    of_goal: '% من الهدف',
    daily_step_goal: 'هدف الخطوات اليومي',
    set_by_coach: 'تحدده المدرب',
    steps_taken: 'خطوة مأخوذة',
    goal: 'الهدف',
    remaining: 'متبقي',
    todays_plan_title: 'خطة اليوم',
    view_all: 'عرض الكل',
    no_plan_yet: 'لا توجد خطة بعد',
    no_plan_desc: 'لم يحدد مدربك خطة بعد.',
    find_coach_or_browse: 'ابحث عن مدرب أو تصفح التمارين للبدء.',
    find_coach: 'ابحث عن مدرب',
    find_coaches: 'ابحث عن مدربين',
    start: 'ابدأ',
    exercises: 'تمارين',
    sets: 'مجموعات',
    reps: 'تكرارات',
    rest: 'راحة',
    show_less: 'عرض أقل',
    no_exercises_today: 'لا توجد تمارين مجدولة لليوم',
    no_meals_yet: 'لا توجد وجبات مجدولة بعد',
    quick_tools: 'الأدوات السريعة',
    tool_bmi_calc: 'حساب مؤشر الكتلة',
    tool_macros: 'المغذيات',
    tool_steps: 'الخطوات',
    tool_water: 'الماء',
    step_sync: 'مزامنة الخطوات',
    water_log: 'سجل الماء',
    sponsored: 'إعلان مدفوع',
    learn_more: 'اعرف المزيد',
    featured_coaches: 'مدربون مميزون',
    book_now: 'احجز الآن',
    ai_performance_analysis: 'تحليل الأداء بالذكاء الاصطناعي',
    performance_rating: 'تقييم الأداء',
    health_advice: 'نصيحة صحية',
    motivational_message: 'رسالة تحفيزية',
    tomorrows_goal: 'هدف الغد',
    steps: 'خطوات',
    cannot_update_goal: 'لا يمكن تحديث الهدف',
    edit: 'تعديل',

    // ── Steps & Activity ──
    stat_steps: 'الخطوات',
    stat_calories: 'السعرات',
    stat_water: 'الماء',
    stat_activity: 'النشاط',
    activity_tracker: 'متتبع النشاط',
    activity_sub: 'تتبع نشاطك اليومي بدقة',
    steps_activity: 'الخطوات والنشاط',
    goal_reached: '🎉 تم تحقيق الهدف!',
    steps_to_go: 'خطوة متبقية',
    start_tracking: 'ابدأ التتبع لرؤية تقدمك',
    week_total: 'إجمالي الأسبوع',
    daily_avg: 'المتوسط اليومي',
    peak_day: 'أعلى يوم',
    calories: 'السعرات',
    days: 'أيام',
    steps_day: 'خطوة/يوم',
    highest: 'الأعلى',
    burned: 'محروقة',
    record_activity: 'تسجيل نشاط',
    manual: 'يدوي',
    live: 'مباشر',
    activity_type: 'نوع النشاط',
    walking: 'مشي',
    running: 'جري',
    date: 'التاريخ',
    distance_km: 'المسافة (كم)',
    any_notes: 'أي ملاحظات...',
    saving: 'جارٍ الحفظ...',
    save_activity: 'حفظ النشاط',
    distance_unit: 'وحدة المسافة',
    live_tracking: 'التتبع المباشر',
    live_tracking_premium: 'التتبع المباشر بـ GPS متاح لأعضاء Premium وخلال الفترة التجريبية ٧ أيام.',
    upgrade_premium: 'الترقية إلى بريميوم',
    today_label: 'اليوم',
    weekly: 'أسبوعي',
    monthly: 'شهري',
    todays_summary: 'ملخص اليوم',
    distance: 'المسافة',
    no_activity_today: 'لم يتم تسجيل أي نشاط اليوم.',
    weekly_breakdown: 'تفاصيل الأسبوع',
    monthly_history: 'سجل الشهر',
    delete_entry_confirm: 'هل أنت متأكد أنك تريد حذف هذا السجل؟',
    entry_deleted: 'تم حذف السجل بنجاح!',
    valid_steps: 'يرجى إدخال خطوات صحيحة',
    steps_saved_offline: 'تم حفظ الخطوات محليًا. ستتم المزامنة عند الاتصال.',
    steps_recorded: 'تم تسجيل الخطوات بنجاح!',
    goal_reached_bonus: 'تم تحقيق الهدف! +٢ نقاط إضافية!',
    saved_offline: 'تم الحفظ محليًا (مشكلة في الاتصال). ستتم المزامنة عند الاتصال.',
    error_adding_steps: 'خطأ في إضافة الخطوات',
    live_session_saved: 'تم حفظ جلسة التتبع المباشر.',
    live_session_failed: 'فشل في حفظ جلسة التتبع.',
    sync_failed: 'فشلت المزامنة — ستتم إعادة المحاولة عند استقرار الاتصال.',
    back_online_sync: 'تم الاتصال بالإنترنت! مزامنة البيانات المحلية...',
    offline_saved: 'أنت غير متصل. سيتم حفظ الخطوات محليًا ومزامنتها عند الاتصال.',
    geolocation_not_supported: 'الموقع الجغرافي غير مدعوم على هذا الجهاز أو المتصفح.',
    failed_start_tracking: 'فشل في بدء التتبع',
    notes: 'ملاحظات',
    trial_remaining: 'تجربة — {n} يوم متبقي',

    // ── Workouts ──
    workouts_title: 'برامج التمرين',
    training: 'التدريب',
    workouts: 'التمارين',
    videos: 'فيديوهات',
    my_plan: 'خطتي',
    search_videos: 'بحث في الفيديوهات...',
    all: 'الكل',
    loading_videos: 'جارٍ تحميل الفيديوهات...',
    no_videos_yet: 'لا توجد فيديوهات بعد',
    no_videos_desc: 'لم يرفع مدربك أو الإدارة أي فيديوهات تمرين بعد. تحقق مجددًا لاحقًا!',
    no_match: 'لا توجد فيديوهات تطابق بحثك',
    no_match_desc: 'جرّب تعديل البحث أو فلتر الفئة.',
    premium_only: 'مدفوع فقط',
    premium: 'مدفوع',
    watch_now: 'شاهد الآن',
    premium_video_msg: 'هذا الفيديو يتطلب اشتراك Premium.',
    points_for_watching: '🎉 +٢ نقاط لمشاهدة الفيديو!',
    no_plan_assigned: 'لم يتم تعيين خطة بعد',
    no_plan_assigned_desc: 'لم يحدد مدربك خطة بعد. احجز جلسة تدريب للحصول على خطة تمرين وتغذية مخصصة.',
    nutrition_plan: 'خطة التغذية',
    protein: 'بروتين',
    carbs: 'كربوهيدرات',
    fat: 'دهون',
    cannot_embed: 'لا يمكن تضمين هذا الفيديو.',
    open_video: 'فتح الفيديو',
    browse: 'تصفح',
    default_upper_body: 'قوة الجزء العلوي',
    default_today_notes: '45 دقيقة • دامبلز • مخصص من مدربك',
    workout_complete: 'انتهى التمرين! ربحت {pts} نقاط.',
    my_workout_plan: 'خطتي للتمارين',
    my_workout_plan_placeholder: 'ستظهر خطة التمرين التي يحددها مدربك هنا. يمكن للمدرب إضافة جلسات وتقدم خاص لك.',
    my_nutrition_plan: 'خطة التغذية',
    my_nutrition_placeholder: 'يمكن لمدربك تقديم خطط وجبات يومية ومكوناتها هنا.',
    start_workout: 'ابدأ التمرين',

    // ── Tools ──
    fitness_tools: 'أدوات اللياقة',
    calorie_calculator: 'حاسبة السعرات',
    bmi_calculator: 'حاسبة مؤشر كتلة الجسم',
    bmi_desc: 'احسب مؤشر كتلة الجسم لمعرفة إذا كان وزنك صحيًا.',
    height_cm: 'الطول (سم)',
    weight_kg: 'الوزن (كجم)',
    calculate_bmi: 'احسب مؤشر الكتلة',
    your_bmi: 'مؤشر كتلة جسمك',
    underweight: 'نقص الوزن',
    normal_weight: 'الوزن الطبيعي',
    overweight: 'الوزن الزائد',
    obese: 'سمنة',
    hydration_calculator: 'حاسبة الترطيب',
    hydration_desc: 'قدّر استهلاكك اليومي من الماء بناءً على الوزن والنشاط.',
    activity_level: 'مستوى النشاط',
    low_activity: 'نشاط منخفض',
    moderate_activity: 'نشاط متوسط',
    high_activity: 'نشاط مرتفع',
    calculate_water: 'احسب كمية الماء',
    daily_water: 'استهلاك الماء اليومي',
    ml: 'مل',
    liters: 'لتر',
    macro_calculator: 'حاسبة المغذيات الكبرى',
    macro_desc: 'ابحث في ٢٠٠+ طعام، شاهد التفاصيل الغذائية واعثر على أفضل التجميعات',

    // ── Coaching ──
    personal_coaching: 'التدريب الشخصي',
    book: 'حجز',
    chat: 'دردشة',
    premium_feature: 'ميزة مدفوعة',
    premium_feature_title: 'ميزة مميزة',
    premium_feature_desc: 'افتح تحليلات متقدمة لتتبع اتجاهات وزنك، وتحليل النشاط التفصيلي، وقياسات الأداء.',
    premium_coaching_title: 'التدريب المميز',
    premium_coaching_desc: 'احصل على إرشاد شخصي، فحوصات الأداء، وخطط مخصصة من مدربينا المعتمدين.',
    my_sessions: 'جلساتي',
    book_with: 'الحجز مع {coach}',
    date_label: 'التاريخ',
    time_label: 'الوقت',
    note_label: 'ملاحظة',
    booking_requested: 'تم طلب الحجز. تحقق من جلساتي للتأكيد.',
    booking_failed: 'فشل في طلب الحجز.',
    upcoming_sessions: 'الجلسات القادمة',
    form_check_review: 'مراجعة وفحص التقنية',
    with_coach: 'مع {coach}',
    tomorrow_label: 'غدًا',

    // ── Pricing ──
    back_to_plans: 'رجوع للخطط',
    premium_annual: 'بريميوم سنوي',
    premium_monthly: 'بريميوم شهري',
    egp_month: 'جنيه/شهر',
    annual_save: 'سنوي (وفّر ٢٥%)',
    annual_total: 'الإجمالي السنوي',
    monthly_charge: 'الرسوم الشهرية',
    unlock_potential: 'اطلق إمكانياتك الكاملة',
    unlock_desc: 'احصل على تدريب شخصي، تحليلات متقدمة، وبرامج حصرية.',
    free_plan: 'الخطة المجانية',
    free_desc: 'أدوات أساسية لتبدأ.',
    basic_workouts: 'برامج تمارين أساسية',
    community_access: 'وصول للمجتمع',
    basic_tracking: 'تتبع أساسي للتقدم',
    advanced_analytics: 'تحليلات متقدمة',
    one_on_one: 'تدريب ١-١',
    custom_meals: 'خطط وجبات مخصصة',
    switch_free: 'التبديل للمجاني',
    current_plan: 'الخطة الحالية',
    recommended: 'موصى به',
    everything_results: 'كل شيء لنتائج جادة.',
    all_workouts: 'جميع برامج التمارين',
    advanced_insights: 'تحليلات ورؤى متقدمة',
    coaching_chat: 'دردشة تدريب ١-١',
    personalized_nutrition: 'خطط تغذية مخصصة',
    live_gps: 'تتبع GPS مباشر',
    priority_support: 'دعم الأولوية',
    active_plan: 'الخطة النشطة ✓',
    upgrade_now: 'ترقية الآن',
    faster_results: 'نتائج أسرع',
    faster_desc: 'أعضاء Premium يحققون أهدافهم أسرع بمرتين في المتوسط.',
    expert_guidance: 'إرشاد خبراء',
    expert_desc: 'وصول مباشر لمدربين معتمدين لفحص الأداء والنصائح.',
    exclusive_content: 'محتوى حصري',
    exclusive_desc: 'برامج جديدة حصرية لأعضاء Premium كل شهر.',

    // ── Onboarding ──
    step_n: 'الخطوة {n}/{total}',
    main_goal: 'ما هو هدفك الرئيسي؟',
    tell_about: 'أخبرنا عن نفسك',
    activity_health: 'النشاط والصحة',
    set_targets: 'حدد أهدافك',
    lose_weight: 'إنقاص الوزن',
    maintain_weight: 'المحافظة على الوزن',
    gain_weight: 'زيادة الوزن',
    build_muscle: 'بناء العضلات',
    continue_btn: 'متابعة',
    gender: 'الجنس',
    male: 'ذكر',
    female: 'أنثى',
    date_of_birth: 'تاريخ الميلاد',
    activity_level_label: 'مستوى النشاط',
    sedentary: 'خامل',
    sedentary_desc: 'قليل أو لا يوجد تمرين',
    light: 'خفيف',
    light_desc: '١-٣ أيام/أسبوع',
    moderate: 'متوسط',
    moderate_desc: '٣-٥ أيام/أسبوع',
    active: 'نشيط',
    active_desc: '٦-٧ أيام/أسبوع',
    very_active: 'نشيط جدًا',
    very_active_desc: 'تمرين شاق يوميًا',
    medical_history: 'التاريخ الطبي (اختياري)',
    medical_placeholder: 'أي إصابات أو حالات صحية...',
    target_weight: 'الوزن المستهدف (كجم)',
    weekly_goal: 'الهدف الأسبوعي (كجم/أسبوع)',
    daily_steps_goal: 'هدف الخطوات اليومي',
    finish_setup: 'إنهاء الإعداد',

    // ── Analytics ──
    generate_ai_insights: 'توليد رؤى بالذكاء الاصطناعي',
    summary: 'الملخص',
    loading: 'جارٍ التحميل...',
    total_steps: 'إجمالي الخطوات',
    total_distance: 'إجمالي المسافة',
    total_calories: 'إجمالي السعرات',
    premium_sessions: 'جلسات مميزة',
    recent_sessions: 'الجلسات الأخيرة',
    performance_metrics: 'مقاييس الأداء',
    avg_daily_steps: 'متوسط الخطوات اليومية',
    total_sessions: 'إجمالي الجلسات',
    calories_burned: 'السعرات المحروقة',
    consistency: 'الاتساق',

    // ── Chat ──
    contacts: 'جهات الاتصال',
    groups: 'المجموعات',
    search_placeholder: 'بحث...',
    now: 'الآن',
    role_coach: 'مدرب',
    role_user: 'مستخدم',
    type_message: 'اكتب رسالة...',
    type_message_placeholder: 'اكتب رسالة...',
    select_contact_start: 'اختر جهة اتصال لبدء المحادثة',
    no_data_today_start: 'لم يتم تسجيل أي نشاط اليوم بعد.',

    // ── Profile ──
    profile_title: 'ملفي الشخصي',
    premium_member: 'عضو بريميوم',
    upgrade_premium: 'الترقية إلى بريميوم',
    points: 'النقاط',
    points_history: 'سجل النقاط',
    hide_history: 'إخفاء السجل',
    view_history: 'عرض السجل',
    how_to_earn_points: 'كيفية كسب النقاط:',
    points_rule_signup: 'التسجيل (هدية ترحيبية)',
    points_rule_video: 'مشاهدة فيديو تمرين كامل',
    points_rule_steps: 'إكمال هدفك اليومي للخطوات',
    no_point_transactions: 'لا توجد معاملات نقاط بعد.',
    pts: 'نقطة',
    physical_stats: 'القياسات البدنية',
    body_metrics: 'قياسات الجسم',
    save_changes: 'حفظ التغييرات',
    edit_stats: 'تعديل القياسات',
    edit: 'تعديل',
    height_label: 'الطول',
    weight_label: 'الوزن',
    medical_history_short: 'التاريخ الطبي',
    medical_history_private: 'تاريخك الطبي خاص ولا يُشارك إلا مع مدربك عند حجز جلسة.',
    medical_history_placeholder_full: 'أدخل أي حالات طبية أو حساسية أو إصابات أو أدوية أو ملاحظات صحية...',
    attach_medical_document: 'إرفاق مستند طبي (اختياري)',
    view_uploaded_document: 'عرض المستند المرفوع',
    click_to_replace: 'انقر للاستبدال',
    upload_document_prompt: 'ارفع ملف PDF أو صورة أو مستند',
    save_medical_history: 'حفظ التاريخ الطبي',
    medical_history_saved: '✅ تم حفظ التاريخ الطبي',
    settings: 'الإعدادات',
    account_details: 'تفاصيل الحساب',
    hide: 'إخفاء',
    name_label: 'الاسم',
    save: 'حفظ',
    cancel: 'إلغاء',
    notifications: 'الإشعارات',
    language_label: 'اللغة',
    theme: 'المظهر',
    dark: 'داكن',
    light_theme: 'فاتح',
    saving: 'جارٍ الحفظ...',

    // ── Community ──
    community: 'المجتمع',
    share_insight: 'شارك نصيحة أو قصة نجاح...',
    create_post: 'إنشاء منشور',
    publish_post: 'نشر المنشور',
    trending: 'رائج',
    likes: 'الإعجابات',
    comments: 'التعليقات',
    announcement: 'إعلان',
    pinned: 'مثبت',
    challenges: 'التحديات',
    feed: 'المنشورات',
    post: 'نشر',
    no_posts: 'لا توجد منشورات بعد. كن أول من يشارك!',

    // ── Coach Pages ──
    my_athletes: 'رياضيّيَّ',
    select_athlete: 'اختر رياضيًا لإدارة خططه',
    overview: 'نظرة عامة',
    workout: 'تمرين',
    nutrition: 'التغذية',
    step_goal_label: 'هدف الخطوات اليومي',
    workout_plan: 'خطة التمرين',
    nutrition_plan_label: 'خطة التغذية',
    manage_plan: 'إدارة الخطة',
    edit_profile: 'تعديل ملف المدرب',
    session_rate: 'سعر الجلسة',
    monthly_plan: 'الخطة الشهرية',
    yearly_plan: 'الخطة السنوية',
    plan_type: 'نوع الخطة',
    available: 'متاح',
    unavailable: 'غير متاح',
    earnings_credit: 'الأرباح والرصيد',
    available_credit: 'الرصيد المتاح',
    withdraw: 'سحب',
    request_withdrawal: 'طلب سحب',
    withdrawal_history: 'سجل السحوبات',
    recent_transactions: 'المعاملات الأخيرة',
    about_me: 'عني',
    reviews: 'التقييمات',
    profile_empty: 'ملفك الشخصي فارغ',
    profile_empty_desc: 'عدّل ملفك ليتمكن الرياضيون من العثور عليك.',
    setup_profile: 'إعداد الملف',
    save_profile: 'حفظ الملف',
    profile_updated: '✅ تم تحديث الملف! الرياضيون يمكنهم إيجادك الآن.',
    failed_save: '❌ فشل في الحفظ.',
    payment_info: 'معلومات الدفع (للسحوبات)',
    payment_info_saved: '✅ تم حفظ معلومات الدفع!',
    failed_payment_info: '❌ فشل في حفظ معلومات الدفع.',
    submit: 'إرسال',
    enter_valid_amount: 'أدخل مبلغًا صحيحًا',
    insufficient_credit: 'رصيد غير كافٍ',
    set_payment_first: 'حدد معلومات الدفع أولاً',
    withdrawal_submitted: '✅ تم تقديم طلب السحب!',
    failed_withdrawal: '❌ فشل في طلب السحب',
    fitness_coach: 'مدرب لياقة',
    not_set: 'غير محدد',
    save_payment_info: 'حفظ معلومات الدفع',
    amount_egp: 'المبلغ (جنيه)',
    card_holder_name: 'اسم حامل البطاقة',
    card_number: 'رقم البطاقة',
    workout_only: 'تمرين فقط',
    nutrition_only: 'تغذية فقط',
    specialty_placeholder: 'مثل: القوة واللياقة',
    location_placeholder: 'مثل: القاهرة، مصر',
    plan_type_offered: 'نوع الخطة المتاحة',
    complete_plan: 'خطة كاملة',
    workout_only_desc: 'تمارين وقوة فقط',
    nutrition_only_desc: 'خطط وجبات وتوجيه غذائي',
    monthly_subscription_price: 'سعر الاشتراك الشهري (جنيه)',
    yearly_subscription_price: 'سعر الاشتراك السنوي (جنيه)',
    e_g_300: 'مثال: 300',
    e_g_3000: 'مثال: 3000',
    bio_placeholder: 'صف فلسفة التدريب الخاصة بك...',
    availability: 'التوفر',
    available_for_clients: 'متاح لعملاء جدد',

    // ── Coach Ads ──
    create_ad: 'إنشاء إعلان',
    ad_rate_info: 'السعر: ٤ جنيه/دقيقة من التعزيز النشط. ادفع عبر المحفظة الإلكترونية مع إثبات.',
    impressions: 'المشاهدات',
    clicks: 'النقرات',
    ctr: 'نسبة النقر',
    active_label: 'نشط',
    pending: 'قيد المراجعة',
    spent: 'المصروف',
    no_ads: 'لا إعلانات بعد',
    create_first_ad: 'أنشئ أول إعلان مدفوع',
    ad_placement: 'مكان الإعلان',
    community_post: '📱 منشور مجتمعي',
    home_banner: '🏠 بانر الصفحة الرئيسية',
    ad_objective: 'هدف الإعلان',
    ad_title: 'عنوان الإعلان',
    description: 'الوصف',
    specialty: 'التخصص',
    call_to_action: 'دعوة للإجراء',
    boost_duration: 'مدة التعزيز',
    time_spent: 'الوقت المنقضي',
    money_spent: 'المبلغ المصروف',
    time_left: 'الوقت المتبقي',
    money_left: 'المبلغ المتبقي',
    payment: 'الدفع',
    submit_pay: 'إرسال ودفع',

    // ── Admin ──
    admin_dashboard: 'لوحة الإدارة',
    users: 'المستخدمون',
    payments: 'المدفوعات',
    content: 'المحتوى',
    website: 'الموقع',
  }
};

interface I18nContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

const normalizeText = (v: string) =>
  String(v || "")
    .trim()
    .replace(/\s+/g, " ")
    .replace(/[\u200E\u200F\u202A-\u202E]/g, "")
    .toLowerCase();

/* ── Build bidirectional reverse maps once ── */
const enTextToKey: Record<string, string> = {};
const arTextToKey: Record<string, string> = {};
const enNormToKey: Record<string, string> = {};
const arNormToKey: Record<string, string> = {};
Object.keys(translations.en).forEach(k => {
  const ev = translations.en[k]?.trim();
  if (ev) {
    enTextToKey[ev] = k;
    enNormToKey[normalizeText(ev)] = k;
  }
  const av = translations.ar[k]?.trim();
  if (av) {
    arTextToKey[av] = k;
    arNormToKey[normalizeText(av)] = k;
  }
});

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => (localStorage.getItem('fithub_lang') as Lang) || 'en');
  const langRef = useRef(lang);
  const observerRef = useRef<MutationObserver | null>(null);

  /* ── Load admin font settings and apply via CSS variables ── */
  useEffect(() => {
    (async () => {
      try {
        const base = getApiBase();
        const r = await fetch(`${base}/api/admin/fonts`);
        if (!r.ok) return;
        const fonts = await r.json();
        const fontEn = fonts.font_en || 'Outfit';
        const fontAr = fonts.font_ar || 'Cairo';
        const fontHeading = fonts.font_heading || 'Chakra Petch';

        // Dynamically load Google Fonts
        const families = [fontEn, fontAr, fontHeading].filter((v, i, a) => a.indexOf(v) === i);
        const gfUrl = `https://fonts.googleapis.com/css2?${families.map(f => `family=${encodeURIComponent(f)}:wght@300;400;500;600;700;800`).join('&')}&display=swap`;
        // Remove old Google font link if any and add new
        const existingLink = document.querySelector('link[data-dynamic-fonts]');
        if (existingLink) existingLink.remove();
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = gfUrl;
        link.setAttribute('data-dynamic-fonts', 'true');
        document.head.appendChild(link);

        // Apply CSS variables for fonts
        document.documentElement.style.setProperty('--font-en', `'${fontEn}', sans-serif`);
        document.documentElement.style.setProperty('--font-ar', `'${fontAr}', sans-serif`);
        document.documentElement.style.setProperty('--font-heading', `'${fontHeading}', sans-serif`);
        // Apply to body based on current lang
        const currentLang = langRef.current;
        document.body.style.fontFamily = currentLang === 'ar'
          ? `'${fontAr}', '${fontEn}', sans-serif`
          : `'${fontEn}', sans-serif`;
      } catch {
        // Fallback: keep CSS default
      }
    })();
  }, []);

  /* Translate a single DOM node */
  const translateNode = useCallback((node: Node) => {
    const currentLang = langRef.current;
    const findKey = (raw: string) => {
      const txt = raw?.trim();
      if (!txt) return undefined;
      return enTextToKey[txt]
        || arTextToKey[txt]
        || enNormToKey[normalizeText(txt)]
        || arNormToKey[normalizeText(txt)];
    };

    try {
      if (node.nodeType === Node.TEXT_NODE) {
        const txt = node.textContent?.trim();
        if (!txt || txt.length < 2) return;
        // Try matching from either language → key → target
        const key = findKey(txt);
        if (key) {
          const translated = translations[currentLang]?.[key];
          if (translated && translated !== txt) {
            node.textContent = node.textContent!.replace(txt, translated);
          }
        }
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const el = node as HTMLElement;
        // skip script/style
        if (el.tagName === 'SCRIPT' || el.tagName === 'STYLE') return;
        // placeholders
        if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) {
          const ph = el.placeholder?.trim();
          if (ph) {
            const key = findKey(ph);
            if (key) {
              const translated = translations[currentLang]?.[key];
              if (translated) el.placeholder = translated;
            }
          }
        }
        // title attribute
        if (el.title) {
          const title = el.title.trim();
          const key = findKey(title);
          if (key) {
            const translated = translations[currentLang]?.[key];
            if (translated) el.title = translated;
          }
        }
      }
    } catch { /* ignore */ }
  }, []);

  /* Walk the entire DOM tree */
  const translateAll = useCallback(() => {
    try {
      const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT,
        null
      );
      let n: Node | null = walker.currentNode;
      while ((n = walker.nextNode())) translateNode(n);
    } catch (e) {
      console.debug('DOM i18n walk failed', e);
    }
  }, [translateNode]);

  useEffect(() => {
    langRef.current = lang;
    localStorage.setItem('fithub_lang', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.body.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.body.style.direction = lang === 'ar' ? 'rtl' : 'ltr';

    // Re-apply body font based on language + CSS variables
    const fontEn = getComputedStyle(document.documentElement).getPropertyValue('--font-en').trim() || "'Outfit', sans-serif";
    const fontAr = getComputedStyle(document.documentElement).getPropertyValue('--font-ar').trim() || "'Cairo', sans-serif";
    document.body.style.fontFamily = lang === 'ar' ? `${fontAr}, ${fontEn}` : fontEn;

    // translate existing DOM
    requestAnimationFrame(() => translateAll());

    // observe new/changed DOM nodes for dynamic content
    if (observerRef.current) observerRef.current.disconnect();
    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.type === 'childList') {
          m.addedNodes.forEach(n => {
            if (n.nodeType === Node.TEXT_NODE) {
              translateNode(n);
            } else if (n.nodeType === Node.ELEMENT_NODE) {
              const walker = document.createTreeWalker(n, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, null);
              translateNode(n);
              let child: Node | null;
              while ((child = walker.nextNode())) translateNode(child);
            }
          });
        } else if (m.type === 'characterData' && m.target) {
          translateNode(m.target);
        }
      }
    });
    observer.observe(document.body, { childList: true, subtree: true, characterData: true });
    observerRef.current = observer;

    return () => observer.disconnect();
  }, [lang, translateAll, translateNode]);

  const t = useCallback((key: string, vars?: Record<string, string | number>) => {
    let v = translations[langRef.current]?.[key] || translations.en[key] || key;
    if (vars) Object.entries(vars).forEach(([k, val]) => { v = v.replace(`{${k}}`, String(val)); });
    return v;
  }, []);

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}
