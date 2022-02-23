import React from 'react';
import './bigImage.scss';
import CloseIcon from '@mui/icons-material/Close';

const BigImage = ({ data, setIsOpen }) => {
  return (
    <div className='bigImage_container'>
      <div className={data.classification === 'Coins' ? 'coins' : 'head'}>
        <div
          className={
            data.images && data.images[0] && data.images[0].baseimageurl
              ? 'inside_image'
              : 'image-not-available'
          }
        >
          <img
            onError={(event) => (event.target.style.display = 'none')}
            src={
              data.images && data.images[0] && data.images[0].baseimageurl
                ? data.images[0].baseimageurl
                : data.images
                ? '/pictures/bg-paper-texture-2.jpg'
                : '/pictures/no-profile-picture.png'
            }
            alt='not available'
          />
        </div>

        <div className='right'>
          <div className='h2'>
            {data.people &&
            data.people[0] &&
            data.people[0].displayname &&
            data.title ? (
              <>
                <div className='bigImage-title'>
                  <div className='bigImage-artist'>
                    {data.people[0].displayname}:
                  </div>
                  {data.title}
                </div>
                <div className='close-icon'>
                  <CloseIcon
                    onClick={() => {
                      setIsOpen(false);
                    }}
                  />
                </div>
              </>
            ) : data.title ? (
              <div className='bigImage-noArtist'>
                <div className='bigImage-title'>
                  Unknown artist: <div>{data.title}</div>
                </div>
                <div className='close-icon'>
                  <CloseIcon
                    onClick={() => {
                      setIsOpen(false);
                    }}
                  />
                </div>
              </div>
            ) : null}
          </div>

          <div className='details'>
            {data.classification ? (
              <div>
                <div>Classification: </div>
                <div className='data'> {data.classification}</div>
              </div>
            ) : (
              <div className='unknown'>
                <div>Classification: </div> <div className='data'>unknown</div>
              </div>
            )}
            {data.century ? (
              <div>
                <div>Century: </div>
                <div className='data'> {data.century}</div>
              </div>
            ) : (
              <div className='unknown'>
                <div>Century: </div> <div className='data'>unknown</div>
              </div>
            )}
            {data.culture ? (
              <div>
                <div>Culture: </div>
                <div className='data'>{data.culture}</div>
              </div>
            ) : (
              <div className='unknown'>
                <div>Culture: </div> <div className='data'>unknown</div>
              </div>
            )}
            {data.dated ? (
              <div>
                <div>Dated: </div> <div className='data'>{data.dated}</div>
              </div>
            ) : (
              <div className='unknown'>
                <div>Dated: </div> <div className='data'>unknown</div>
              </div>
            )}{' '}
            {data.department ? (
              <div>
                <div>Department: </div>
                <div className='data'>{data.department}</div>
              </div>
            ) : (
              <div className='unknown'>
                <div>Department: </div> <div className='data'>no data</div>
              </div>
            )}
            {data.dimensions ? (
              <div>
                <div>Dimensions:</div>
                <div className='data'>{data.dimensions}</div>
              </div>
            ) : (
              <div className='unknown'>
                <div>Dimensions: </div> <div className='data'>no data</div>
              </div>
            )}
            {data.division ? (
              <div>
                <div>Division: </div>
                <div className='data'>{data.division}</div>
              </div>
            ) : (
              <div className='unknown'>
                <div>Division: </div> <div className='data'>no data</div>
              </div>
            )}
            {data.medium ? (
              <div>
                <div>Technique: </div>
                <div className='data'>{data.medium}</div>
              </div>
            ) : (
              <div className='unknown'>
                <div>Technique: </div>
                <div className='data'>no data</div>
              </div>
            )}
            {data.period ? (
              <div>
                <div>Artistic period: </div>
                <div className='data'>{data.period}</div>
              </div>
            ) : (
              <div className='unknown'>
                <div>Artistic period: </div>
                <div className='data'>unknown</div>
              </div>
            )}
            {data.worktypes && data.worktypes[0] ? (
              <div>
                <div>Worktype: </div>
                <div className='data'>{data.worktypes[0].worktype}</div>
              </div>
            ) : (
              <div className='unknown'>
                <div>Worktype: </div>
                <div className='data'>unknown</div>
              </div>
            )}
          </div>
        </div>
      </div>
      {data.images && data.images[0] && data.images[0].description ? (
        <div className='description'>{data.images[0].description}</div>
      ) : (
        <div className='unknown description'>
          Description is not yet part of the museum API
        </div>
      )}
    </div>
  );
};

export default BigImage;
