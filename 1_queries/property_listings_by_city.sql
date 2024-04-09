-- Property listing, filter by location
-- Order the results from lowest cost_per_night to highest cost_per_night.
-- Limit the number of results to 10.
-- Only show listings that have a rating >= 4 stars.

SELECT properties.id, properties.title, properties.cost_per_night, AVG(property_reviews.rating) as average_rating
  FROM properties
  LEFT JOIN property_reviews
  ON properties.id = property_id
  WHERE city LIKE '%ancouv%'
  GROUP BY properties.id
  HAVING avg(property_reviews.rating) >= 4
  ORDER BY cost_per_night
  LIMIT 10;